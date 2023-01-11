import { Group } from './group';

export class Floor {
    floor_num: number;
    up_groups: Group[];
    down_groups: Group[];

    constructor(floor_num: number) {
        this.floor_num = floor_num;
        this.up_groups = [];
        this.down_groups = [];
    }

    add_up_group(group: Group) {
        this.up_groups.push(group);
    }

    add_down_group(group: Group) {
        this.down_groups.push(group);
    }
}