<script lang="ts">
import { v4 as uuidv4 } from 'uuid'
import {subscribe, snapshot } from 'valtio/vanilla'
import {proxyMap} from 'valtio/vanilla/utils'
import { type Operation, ShapeStream } from '@electric-sql/client'
import { matchBy, matchStream } from '@electric-sql/experimental'
import { trpc, insertRecipeWithIngredientsSchema } from 'api'
import z from 'zod/v4'

const KEY = "test"

type Recipe = z.infer<typeof insertRecipeWithIngredientsSchema>;

type PartialRecipe = Partial<Recipe> & {
  recipe: {
    id: string
    familyId: string
  },
  ingredients: []
}

type LocalWrite = {
    id: string;
    operation: Operation
    value: PartialRecipe
}


const optimisticState = proxyMap<string, LocalWrite>(JSON.parse(localStorage.getItem(KEY) || '[]'))

subscribe(optimisticState, () => {
    localStorage.setItem(KEY, JSON.stringify([...optimisticState]))
})

function addLocalWrite(operation: Operation, value: PartialRecipe): LocalWrite {
    const id = uuidv4()
    const write: LocalWrite = {
        id,
        operation,
        value,
    }

    optimisticState.set(id, write)

    return write
}

async function matchWrite(
    stream: ShapeStream<Recipe>,
    write: LocalWrite
): Promise<void> {
    const { operation, value } = write

    const matchFn = operation === 'delete' ? matchBy('id', value.recipe.id) : matchBy('write_id', write.id)

    try {
        await matchStream(stream, [operation], matchFn)
    } catch (_err) {
        return
    }

    optimisticState.delete(write.id)
}

async function sendRequest(
  { id, value }: LocalWrite
): Promise<void> {
  const data = {
    ...value,
    write_id: id,
  }

  let response: Recipe | undefined
  try {
    response = await trpc.recipeCreate.mutate(data)
  } catch (_err) {
    // ignore
  }

  if (response === undefined ) {
    optimisticState.delete(id)
  }
}

/*
export function SharedPersistent() {
  const isPending = $state(false)
  // Use Electric's `useShape` hook to sync data from Postgres.
  const { isLoading, data, stream } = useShape<Todo>({
    url: `${ELECTRIC_URL}/v1/shape`,
    params: {
      table: 'todos',
      ...envParams,
    },
    parser: {
      timestamptz: (value: string) => new Date(value),
    },
  })

  const sorted = data ? data.sort((a, b) => +a.created_at - +b.created_at) : []

  // Get the local optimistic state.
  const localWrites = useSnapshot<Map<string, LocalWrite>>(optimisticState)

  const computeOptimisticState = (
    synced: Todo[],
    writes: LocalWrite[]
  ): Todo[] => {
    return writes.reduce(
      (synced: Todo[], { operation, value }: LocalWrite): Todo[] => {
        switch (operation) {
          case 'insert':
            return [...synced, value as Todo]
          case 'update':
            return synced.map((todo) =>
              todo.id === value.id ? { ...todo, ...value } : todo
            )
          case 'delete':
            return synced.filter((todo) => todo.id !== value.id)
          default:
            return synced
        }
      },
      synced
    )
  }

  const todos = computeOptimisticState(sorted, [...localWrites.values()])

  // These are the same event handler functions from the previous optimistic
  // state pattern, adapted to add the state to the shared, persistent store.

  async function createTodo(event: React.FormEvent) {
    event.preventDefault()

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)
    const title = formData.get('todo') as string

    const path = '/todos'
    const data = {
      id: uuidv4(),
      title: title,
      completed: false,
      created_at: new Date(),
    }

    startTransition(async () => {
      const write = addLocalWrite('insert', data)
      const fetchPromise = sendRequest(path, 'POST', write)
      const syncPromise = matchWrite(stream, write)

      await Promise.all([fetchPromise, syncPromise])
    })

    form.reset()
  }

  async function updateTodo(todo: Todo) {
    const { id, completed } = todo

    const path = `/todos/${id}`
    const data = {
      id,
      completed: !completed,
    }

    startTransition(async () => {
      const write = addLocalWrite('update', data)
      const fetchPromise = sendRequest(path, 'PUT', write)
      const syncPromise = matchWrite(stream, write)

      await Promise.all([fetchPromise, syncPromise])
    })
  }

  async function deleteTodo(event: React.MouseEvent, todo: Todo) {
    event.preventDefault()

    const { id } = todo

    const path = `/todos/${id}`
    const data = {
      id,
    }

    startTransition(async () => {
      const write = addLocalWrite('delete', data)
      const fetchPromise = sendRequest(path, 'DELETE', write)
      const syncPromise = matchWrite(stream, write)

      await Promise.all([fetchPromise, syncPromise])
    })
  }
*/
</script>