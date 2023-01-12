import { Elevator } from "./elevator";
import { Group } from "./group";
import { Floor } from "./floor";

// constants
const time_pass_floor = 2;
const time_open_door = 2
const time_admit_passenger = 1;
const num_floors = 13;
const num_elevators = 1;
const elevator_capacity = 25;
const num_total_ticks = 500;
const prob_adding_group = .02
const max_num_persons = 6;

export class AlgorithmA {

    waiting_groups: Floor[];
    finished_groups: Group[];
    elevators: Elevator[];

    constructor() {
        this.waiting_groups = [];
        this.finished_groups = [];
        this.elevators = [];

        // init floors
        for (let i = 0; i < num_floors; i++) {
            this.waiting_groups.push(new Floor(i));
        }

        // init elevators
        for (let i = 0; i < num_elevators; i++) {
            this.elevators.push(new Elevator(i, elevator_capacity, time_pass_floor, time_open_door, time_admit_passenger, num_floors, this.waiting_groups, this.finished_groups)); //make elevator init
        }
    }

    run() {
        for (let i = 0; i < num_total_ticks; ++i) {
            this.tick();
        }
        let total_sum = 0;
        let elevator_sum = 0;
        for (let i = 0; i < this.finished_groups.length; ++i) {
            total_sum += this.finished_groups[i].total_wait;
            elevator_sum += this.finished_groups[i].wait_in_elevator;
        }
        let total_avg = total_sum / this.finished_groups.length;
        let elevator_avg = elevator_sum / this.finished_groups.length;
        console.log("Average wait per group is " + total_avg);
        console.log("Average wait per group in elevator is " + elevator_avg);

    }

    tick() {
        for (let i = 0; i < this.waiting_groups.length; ++i) {
            if (Math.random() <= prob_adding_group) {
                let destination = i;
                while (destination == i) {
                    destination = Math.floor(Math.random() * (num_floors - 1));
                }
                let num_persons = Math.floor(Math.random() * (max_num_persons - 1)) + 1;
                if (destination > i) {
                    this.waiting_groups[i].add_up_group(new Group(i, destination, num_persons));
                }
                if (destination < i) {
                    this.waiting_groups[i].add_down_group(new Group(i, destination, num_persons));
                }
            }
        }
        for (let i = 0; i < this.elevators.length; ++i) {
            this.elevators[i].doTick();
        }
        for (let i = 0; i < this.waiting_groups.length; ++i) {
            for (let j = 0; j < this.waiting_groups[i].up_groups.length; ++j) {
                this.waiting_groups[i].up_groups[i].add_tick_to_wait
            }
            for (let j = 0; j < this.waiting_groups[i].down_groups.length; ++j) {
                this.waiting_groups[i].down_groups[i].add_tick_to_wait
            }
        }


    }

}

