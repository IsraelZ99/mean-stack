type TaskStatus = "To do it" | "In progress" | "Finished";
export const TaskStatusSelected = [
    { value: "To do it" },
    { value: "In progress" },
    { value: "Finished" }];

export class TaskModel {
    constructor(
        public _id: string,
        public tittle: string,
        public date: Date,
        public status: TaskStatus
    ) { }
}