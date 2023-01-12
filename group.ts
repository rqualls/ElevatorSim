import { Direction } from './direction';

export class Group {

    current_floor: number;
    destination_floor: number;
    number_persons: number;
    direction: Direction;

    total_wait: number;
    wait_in_elevator: number;

    claimed_by: number;

    //transfering: boolean;
    in_elevator: boolean;

    service_counter: number;


    constructor(
        current_floor: number,
        destination_floor: number,
        number_persons: number) {
            this.current_floor = current_floor;
            this.destination_floor = destination_floor;
            this.number_persons = number_persons;

            this.claimed_by = -1;

            if (destination_floor > current_floor) {
                this.direction = Direction.up;

            } else if (destination_floor < current_floor) {
                this.direction = Direction.down;
            } else {
                console.log("Invalid Group: destination floor and current floor are the same");
            }

            this.total_wait = 0;
            this.wait_in_elevator = 0;
            //this.transfering = false;
            this.in_elevator = false;
            this.service_counter = 0;
    }

    add_tick_to_wait() {
        ++this.total_wait;
    }

    add_tick_to_wait_in_elevator() {
        ++this.total_wait;
        ++this.wait_in_elevator;
    }

    service(time_per_person: number) {
        ++this.service_counter;
        if (this.service_counter % (time_per_person * this.number_persons) == 0) {
            this.in_elevator = !this.in_elevator;
        }
    }
}