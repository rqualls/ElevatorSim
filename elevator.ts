import { Direction } from './direction';
import { Group } from './group';
import { Floor } from "./floor";

export class Elevator {
    id: number;

    capacity: number;
    time_pass_floor: number;
    time_open_door: number;
    time_admit_passenger: number;
    num_floors: number;

    pass_floor_counter: number;
    open_door_counter: number;
    door_closed: boolean;

    direction: Direction;
    current_floor: number;


    waiting_groups: Floor[];
    finished_groups: Group[];

    held_groups: Group[];
    total_number_persons: number;

    stopped: boolean;
    

    constructor(
        id: number,
        capacity: number,
        time_pass_floor: number,
        time_open_door: number,
        time_admit_passenger: number,
        num_floors: number,
        waiting_groups: Floor[],
        finished_groups: Group[]) {
            this.id = id;
            this.capacity = capacity;
            this.time_pass_floor = time_pass_floor;
            this.time_open_door = time_open_door;
            this.time_admit_passenger = time_admit_passenger;
            this.num_floors = num_floors;
            this.waiting_groups = waiting_groups;
            this.finished_groups = finished_groups;

            this.pass_floor_counter = 0;
            this.open_door_counter = 0;
            this.door_closed = true;
            this.direction = Direction.up;
            this.current_floor = 0;
            this.held_groups = [];
            this.total_number_persons = 0;
            this.stopped = true;


    }

    doTick() {
        if (this.stopped) {
            this.service_floor();
        } else {
            if (this.current_floor == this.num_floors) {
                this.direction = Direction.down;
            }
            if (this.current_floor == 0) {
                this.direction = Direction.up;
            }
            if (this.held_groups.length == 0) {
            } else {
                if (this.direction == Direction.up) {
                    ++this.pass_floor_counter;
                    if (this.pass_floor_counter % this.time_pass_floor == 0) {
                        ++this.current_floor;
                        if (this.needToService(this.current_floor)) {
                            this.stopped = true;
                        }
                    }
                }
                if (this.direction == Direction.down) {
                    ++this.pass_floor_counter;
                    if (this.pass_floor_counter % this.time_pass_floor == 0) {
                        --this.current_floor;
                        if (this.needToService(this.current_floor)) {
                            this.stopped = true;
                        }
                    }
                }
            }
        }
        for (let i = 0; i < this.held_groups.length; i++) {
            this.held_groups[i].add_tick_to_wait_in_elevator;
        } 
    }

    needToService(floor_num: number) {
        for (let i = 0; i < this.held_groups.length; i++) {
            if (this.held_groups[i].destination_floor == floor_num) {
                return true;
            }
        }
        if (this.direction == Direction.up && this.waiting_groups[this.current_floor].up_groups.length != 0) {
            return true;
        }
        if (this.direction == Direction.down && this.waiting_groups[this.current_floor].down_groups.length != 0) {
            return true;
        }
        return false;
    }

    service_floor() {
        if (this.door_closed) {
            ++this.open_door_counter;
            if (this.open_door_counter % this.time_open_door == 0) {
                this.door_closed = false;
            }
            return;
        }
        for (let i = 0; i < this.held_groups.length; i++) {
            if (this.held_groups[i].destination_floor == this.current_floor) {
                this.held_groups[i].service(this.time_admit_passenger);
                if (this.held_groups[i].in_elevator == false) {
                    this.total_number_persons -= this.held_groups[i].number_persons;
                    this.finished_groups.push(this.held_groups[i]);
                    this.held_groups.splice(i,1);
                }
                return;
            }
        }
        if (this.direction == Direction.up) {
            for (let i = 0; i < this.waiting_groups[this.current_floor].up_groups.length; i++) {
                if (this.waiting_groups[this.current_floor].up_groups[i].claimed_by == this.id) {
                    this.waiting_groups[this.current_floor].up_groups[i].service(this.time_admit_passenger);
                    if (this.waiting_groups[this.current_floor].up_groups[i].in_elevator == true) {
                        this.held_groups.push(this.waiting_groups[this.current_floor].up_groups[i]);
                        this.waiting_groups[this.current_floor].up_groups.slice(i,1);
                    }
                    return;
                } else if (this.waiting_groups[this.current_floor].up_groups[i].claimed_by == -1 && this.total_number_persons + this.waiting_groups[this.current_floor].up_groups[i].number_persons <= this.capacity) {
                    this.waiting_groups[this.current_floor].up_groups[i].claimed_by = this.id;
                    this.total_number_persons += this.waiting_groups[this.current_floor].up_groups[i].number_persons;
                    this.waiting_groups[this.current_floor].up_groups[i].service(this.time_admit_passenger);
                    return;
                }
            }
        }
        if (this.direction == Direction.down) {
            for (let i = 0; i < this.waiting_groups[this.current_floor].down_groups.length; i++) {
                if (this.waiting_groups[this.current_floor].down_groups[i].claimed_by == this.id) {
                    this.waiting_groups[this.current_floor].down_groups[i].service(this.time_admit_passenger);
                    if (this.waiting_groups[this.current_floor].down_groups[i].in_elevator == true) {
                        this.held_groups.push(this.waiting_groups[this.current_floor].down_groups[i]);
                        this.waiting_groups[this.current_floor].down_groups.slice(i,1);
                    }
                    return;
                } else if (this.waiting_groups[this.current_floor].down_groups[i].claimed_by == -1 && this.total_number_persons + this.waiting_groups[this.current_floor].down_groups[i].number_persons <= this.capacity) {
                    this.waiting_groups[this.current_floor].down_groups[i].claimed_by = this.id;
                    this.total_number_persons += this.waiting_groups[this.current_floor].down_groups[i].number_persons;
                    this.waiting_groups[this.current_floor].down_groups[i].service(this.time_admit_passenger);
                    return;
                }
            }
        }
        if (!this.door_closed) {
            ++this.open_door_counter;
            if (this.open_door_counter % this.time_open_door == 0) {
                this.door_closed = true;
            }
            return;
        }
        this.stopped = false;
    }

}