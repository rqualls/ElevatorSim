import { Elevator } from "./elevator";
import { Group } from "./group";
import { Floor } from "./floor";

const num_floors = 13;

let waiting_groups: Floor[] = [];
let finished_groups: Group[];

for (let i = 0; i < num_floors; i++) {
    waiting_groups.push(new Floor(i));
}

