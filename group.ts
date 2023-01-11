import { Direction } from './direction';

export class Group {
    current_floor: number;
    destination_floor: number;
    number_persons: number;
    direction: Direction;

    total_wait: number;
    wait_in_elevator: number;

    constructor(
        current_floor: number,
        destination_floor: number,
        number_persons: number,
        direction: Direction) {
            this.current_floor = current_floor;
            this.destination_floor = destination_floor;
            this.number_persons = number_persons;

            if (destination_floor > current_floor) {
                this.direction = Direction.up;

            } else if (destination_floor < current_floor) {
                this.direction = Direction.down;
            } else {
                console.log("Invalid Group: destination floor and current floor are the same");
            }

            this.total_wait = 0;
            this.wait_in_elevator = 0;
        }
}