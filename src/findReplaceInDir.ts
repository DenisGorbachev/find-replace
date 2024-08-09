import { walk, type WalkOptions } from 'https://deno.land/std@0.224.0/fs/mod.ts'

export async function findReplaceInDir(needle: string | RegExp, replacement: string, dir: string) {
  const options: WalkOptions = { includeDirs: false }
  for await (const entry of walk(dir, options)) {
    await findReplaceInPath(needle, replacement, entry.path)
  }
}

export async function findReplaceInPath(needle: string | RegExp, replacement: string, path: string) {
  const oldContent = await Deno.readTextFile(path)
  const newContent = oldContent.replace(needle, replacement)
  await Deno.writeTextFile(path, newContent)
}
