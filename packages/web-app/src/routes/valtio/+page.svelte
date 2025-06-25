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

type LocalWrite = {
    id: string;
    operation: Operation
    value: Recipe
}

const optimisticState = proxyMap<string, LocalWrite>(JSON.parse(localStorage.getItem(KEY) || '[]'))

subscribe(optimisticState, () => {
    localStorage.setItem(KEY, JSON.stringify([...optimisticState]))
})

function addLocalWrite(operation: Operation, value: Recipe): LocalWrite {
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

</script>