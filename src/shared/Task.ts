import { Allow, Entity, Fields } from "remult";

@Entity('tasks', {
    // allowApiCrud: true, // Para permitir inicialmente todas las operaciones CRUD
    allowApiCrud: Allow.authenticated,
    allowApiInsert: "admin",
    allowApiDelete: "admin",
    // allowApiRead: Allow.authenticated
})
export class Task {
    @Fields.autoIncrement()
    id = 0

    @Fields.string<Task>({
        required: true,
        // allowApiUpdate: "admin"
    })
    title = ""

    @Fields.boolean()
    completed = false

    @Fields.createdAt()
    createdAt?: Date
}