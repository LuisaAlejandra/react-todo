import { Allow, Entity, Fields, remult } from "remult";

@Entity('tasks', {
    // allowApiCrud: true, // Para permitir inicialmente todas las operaciones CRUD
    allowApiCrud: Allow.authenticated,
})
export class Task {
    @Fields.uuid()
    id = ''

    @Fields.string<Task>({
        required: true,
    })
    title = ""

    @Fields.boolean()
    completed = false

    @Fields.createdAt()
    createdAt?: Date
}