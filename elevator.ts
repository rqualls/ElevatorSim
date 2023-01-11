import { Direction } from './direction';
import { Group } from './group';

export class Elevator {
    capacity: number;
    time_pass_floor: number;
    time_open_door: number;
    time_admit_passenger: number;
    num_floors: number;

    direction: Direction;

    groups: Group[];

}