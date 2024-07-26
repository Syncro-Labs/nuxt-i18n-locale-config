import { createResolver, resolveFiles, type Resolver } from "@nuxt/kit";
import { defu } from "defu";
import { dirname } from "pathe";
import type { LocaleConfig } from "../runtime/composables/defineLocale";
import type { Nuxt } from "@nuxt/schema";
import jiti from "jiti";
import type { ModuleOptions } from "../module";

export type ResolveType = (...path: string[]) => string;

export async function GetDefinitionsPaths(
  resolver: Resolver,
  path: string,
  pattern: string | string[] = "*/definition.ts"
) {
  const definitions = await resolveFiles(resolver.resolve(path), pattern);

  return definitions;
}

export async function GetLocales(nuxt: Nuxt, options: ModuleOptions) {
  const resolver = createResolver(nuxt.options.rootDir);
  const jit = jiti(resolver.resolve("."), {
    interopDefault: true,
    esmResolve: true,
    transformModules: [resolver.resolve("./runtime/composables/defineLocale")],
  });

  let definitions = [];

  for (const localeDir of options.localeDirs) {
    definitions.push(...(await GetDefinitionsPaths(resolver, localeDir)));
  }

  // const definitions = await GetDefinitionsPaths(resolver,)

  let locales: Array<ComputedLocale> = [];

  for (const _definitionPath of definitions) {
    const locale = jit(_definitionPath);
    locales.push(await ComputeLocale(resolver, _definitionPath, locale));
  }

  return locales;
}

export async function ComputeLocale(
  resolver: Resolver,
  _definitionPath: string,
  locale: LocaleConfig
) {
  return defu(locale, {
    locale: {
      files: await resolveFiles(
        await resolver.resolvePath(dirname(_definitionPath)),
        "**.json"
      ),
    },
    _definitionPath,
    _dirname: dirname(_definitionPath),
  });
}

export type ComputedLocale = Awaited<ReturnType<typeof ComputeLocale>>;
