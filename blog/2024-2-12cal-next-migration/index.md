---
slug: cal-next-migration
title: "Large-scale Next.js Migration at Cal.com: impact, challenges & lessons learned"
authors: [alex]
tags: [migration, case study]
toc_min_heading_level: 2
toc_max_heading_level: 2

---

import VideoSwitcher from '../../src/components/VideoSwitcher.tsx';
import Figure from '../../src/components/figures.jsx'

<head>
  <meta property="og:site_name" content="Codemod.com" />
  <meta content="Large-scale Next.js Migration at Cal.com: impact, challenges & lessons learned" property="og:title"/>
  <meta content="This technical blog post discusses a large-scale migration from Next.js Pages to App, performed by us, Codemod engineers, on the Cal.com open-source product." property="og:description"/>

  <meta content="@codemod" name="twitter:site"/>
  <meta content="summary_large_image" name="twitter:card"/>
  
  <meta name='og:image' content='https://codemodcom.mintlify.app/api/og?division=Blog&section=Case%20Study&title=Large-scale%20Next.js%20Migration%20at%20Cal.com&logoLight=https%3A%2F%2Fmintlify.s3-us-west-1.amazonaws.com%2Fcodemodcom%2Flogo%2Fcodemod-logo-light.svg&logoDark=https%3A%2F%2Fmintlify.s3-us-west-1.amazonaws.com%2Fcodemodcom%2Flogo%2Fcodemod-logo-dark.svg&primaryColor=%230B151E&lightColor=%23D6FF62&darkColor=%230B151E'/>

  <meta name='twitter:image' content='https://codemodcom.mintlify.app/api/og?division=Blog&section=Case%20Study&title=Large-scale%20Next.js%20Migration%20at%20Cal.com&logoLight=https%3A%2F%2Fmintlify.s3-us-west-1.amazonaws.com%2Fcodemodcom%2Flogo%2Fcodemod-logo-light.svg&logoDark=https%3A%2F%2Fmintlify.s3-us-west-1.amazonaws.com%2Fcodemodcom%2Flogo%2Fcodemod-logo-dark.svg&primaryColor=%230B151E&lightColor=%23D6FF62&darkColor=%230B151E'/>
  <meta content="This technical blog post discusses a large-scale migration from Next.js Pages to App, performed by us, Codemod engineers, on the Cal.com open-source product." name="twitter:description"/>
</head>

This technical blog post discusses a large-scale migration from Next.js Pages to App, performed by us, Codemod engineers, on the Cal.com open-source product. We talk about the migration planning, execution, challenges we faced and overcame during such large migrations, the DevX and performance gains from this modernization project, and the lessons we learned that could be applied to future migrations. Hope you find it useful and please share your feedback and reactions with us.

<!--truncate-->

## Intro

### Next.js & App Router

Next.js, a React framework maintained by Vercel, has been gaining traction for building performant and scalable web applications. Next.js boasts 5.2 million weekly downloads today.

Since the inception of the framework in 2016, the web development space has changed drastically. App Router is an example of such step-change improvements that introduce a paradigm shift to the architecture of Next.js applications.

Next.js App Router leverages the recent development of React.js—mainly server-side components, server actions, and streaming—which introduces an architecture that completely separates the server-side and the client-side code. Thanks to this new paradigm, developers can create more performant applications with better developer experience.

While Next.js allows for page-by-page migration, making this move in large apps is still a massive undertaking, as we experienced it first-hand with [Cal.com](http://Cal.com) migration.

### Cal.com

[Cal.com](http://Cal.com) is an open-source scheduling platform, with a mission to connect a billion people by 2031. Cal.com is one of Vercel’s enterprise customers and we got introduced to them via Guillermo Rauch, Vercel’s CEO, as a great example of a progressive company with a large Next.js app which is keen on leveraging the latest features of Next.js including performance and devX gains.

### Codemod

At Codemod, we are on a mission to solve the problem of code migration for codebases of any size. That is why we partnered with Vercel & Cal.com and undertook this feat to feel the pain, learn new things, and strategize our product roadmap. We want to meet developers where they are and build useful tools so they can automate crucial yet undifferentiated migrations, and focus more on building new amazing digital experiences. Let’s dive in.

## Migration Planning

#### Objective

Cal.com engineers wanted to migrate their project to the App Router for:

1. Better Developer Experience
    1. The clear separation between layout, metadata, and page components.
2. Better Performance
    1. The clear separation between the server-side and the client-side code. They can fetch data from remote sources on the server instead of on the client-side because the former is faster.
    2. The streaming feature allows the asynchronous fetching to begin on the server, and once it is ready, it shows the result on the client side.
    3. Making the app load faster thanks to Server-Side Rendering. While performance improvement was important to the business, the Cal team was more excited about the DevX improvements mentioned above.

#### [Cal.com](http://Cal.com) Tech Stack

Understanding the existing tech stack and the ecosystem around a framework that is going to be modernized is crucial in foreseeing the migration readiness, resolving any unprecedented issues, and also securing enough resources, and providing the best estimates for the successful completion of the migration.

Cal uses Next.js, Turborepo, tRPC, Next Auth, next-i18next, and other libraries tied to the Next.js ecosystem. Cal product has 100+ pages. and the repo is 250k+ LoC.

#### Migration Strategy

Since [Cal.com](http://Cal.com) is a large and production-scale repo, incremental migration was the way to go. As described in detail below, after doing some core bootstrapping development, we migrated one page or page group at a time. we introduced the new App Router code as unused code and once the code was ready, we gradually channeled the production traffic from Pages Router to App Router with the help of feature flags. Once the migration is complete, we do the clean-up.

#### Roles

Codemod team was responsible for the development during the migration. 

Cal team was responsible for onboarding our engineers on the project, as well as doing speedy PR reviews.

#### Timeline

The migration took 5 months (September 2023-end of Jan 2024), 3 engineers from Codemod at 50% time allocation for this migration.

#### Testing plan

Existing test at Cal was acceptable and for all the development on our side, we built tests to reduce the chances of bugs. Our team did minimal user-acceptable testing (UAT) and the Cal team did a more comprehensive UAT.

#### Rollback Plan

We used Vercel’s edge config as our feature flag system to safely and gradually roll out the migration to production traffic.

#### Communication Plan

We shared daily updates, with links to related docs and PRs, and impact statement, through Slack. We use Linear for task management and created a lindie dashboard to provide a real-time view of our work with Cal team.

## Migration Execution

In order to incrementally migrate each page or page group from Pages Router to App Router, first we need to do some prep work and do bootstrapping, as described below in detail. 

To automate the migration as much as possible, we used codemods, scripts that make systematic changes to source code by performing a set of operations on the abstract syntax trees. 

Before our cooperation with Cal.com even began, our team had already built several sophisticated codemods to migrate the Next.js v13 projects to v14:

1. a codemod to introduce the boilerplate structure of the `app` directory ([App Directory Boilerplate](https://github.com/codemod-com/codemod-registry/tree/main/codemods/next/13/app-directory-boilerplate)),
2. a codemod to migrate the router hooks to the navigation hooks ([Replace Next Router](https://github.com/codemod-com/codemod-registry/tree/main/codemods/next/13/replace-next-router)),
3. a codemod to generate the new metadata structure based on existing meta tags ([Replace Next Head](https://github.com/codemod-com/codemod-registry/tree/main/codemods/next/13/replace-next-head)).

We duplicated and tweaked these generically applicable codemods to accommodate for Cal.com’s special folder structure. You can find these under the `cal.com` folder in the Registry section of [the Codemod VSCode Extension.](https://marketplace.visualstudio.com/items?itemname=codemod.codemod-vscode-extension)

:::tip
Building codemods manually might be time-consuming and challenging. We are building [Codemod Studio](https://codemod.studio) to leverage the power of LLMs, a live codemod runner, test cases, a live debugger, and an AST viewer for advanced users to help devs build codemods faster and easier.
:::

Below are the 4 main phases of the migration.

#### 1. Migrating the navigation hooks

As the first step, we migrated the navigation hooks from `next/router` to `next/navigation` as it introduced no behavior change. We automated this phase by [the navigation hook codemod](https://github.com/codemod-com/codemod-registry/tree/main/codemods/next/13/replace-next-router) that we mentioned in the previous section. You can check out [the PR](https://github.com/calcom/cal.com/pull/9105/files) that used this codemod.

Virtually every Next.js developer uses params and search params daily. In the Pages Router, you can access the `query` property on the router. It contains both params and search params. Because of such a combination, the code written for the page router does not distinguish between dynamic router params and query params.

In the App Router, the equivalent of `query` is `useSearchParams`. The hook used to return params and search params as well, up until Next.js 13.5.4, where it started returning only search params. As you can imagine, such a change introduces a lot of regressions.

Initially, we transformed the following snippet:

```tsx
import { useRouter } from "next/router";

export const Component = () => {
		const router = useRouter();
	  const username = router.query["username"];
}
```

into its equivalent:

```tsx
import { useSearchParams } from "next/navigation";

export const Component = () => {
  const searchParams = useSearchParams();
  const username = searchParams?.get("username")
}
```

As you can see, since Next.js 13.5.4, we would not get `username` if it originated from the dynamic router params. This prompted us to create a hook called `useCompatSearchParams` to replace all usages of `useSearchParams` that they added into the [Cal.com](http://Cal.com) codebase using a codemod. You can check the codemod out [here](https://github.com/codemod-com/codemod-registry/tree/main/codemods/next/13/replace-use-search-params). The team created a PR with the applied codemod [here](https://github.com/calcom/cal.com/pull/12056).

Additionally, `useParams` returns different values depending on the Next.js version, sometimes it’s an array, a slash-separated string. The codemod takes care of such distinction as well.

#### 2. Bootstrapping

To mitigate potential disruptions in momentum during the page migration process, we performed a bootstrapping phase, where we created the mandatory files for migration and implemented A/B testing.

Creating the `app` directory and required files consisted of:

- the root layout,
- the not-found page,
- the error handler.

*The code snippets below are simplified for explanatory purposes.*

**The root layout:**

`app/layout.tsx`

```tsx
import React from "react";
import calFont from "./_font";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html data-nextjs-router="app">
      <head>
        <style>{`
          :root {
            --font-inter: ${calFont.style.fontFamily.replace(/\'/g, "")};
          }
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
```

**The not-found page:**

`app/not-found.tsx`

```jsx
import NotFoundPage from "@pages/404";

export const dynamic = "force-static";

export default NotFoundPage;
```

**The error handler:**

Two files are needed to handle runtime errors in the App Router: `global-error.js` and `error.js`. The first one handles errors within the root layout, while the second one handles errors in all nested pages. `global-error` is needed because `error.js` is unable to handle errors in the root layout.

`app/global-error.tsx`

```tsx
"use client";

import { type NextPage } from "next";

import CustomError, { type DefaultErrorProps } from "./error";

export const GlobalError: NextPage<DefaultErrorProps> = (props) => {
  return (
    <html>
      <body>
        <CustomError {...props} />
      </body>
    </html>
  );
};

export default GlobalError;
```

`app/error.tsx` 

```tsx
"use client";

import { ErrorPage } from "@components/error/error-page";

const CustomError = (props) => {
  const { error } = props;

  return (
    <ErrorPage error={error} />
  );
};

export default CustomError;
```

**Implementation of the A/B testing capabilities assuming that Page Router and App Router are both supported.**

First of all, we added an environment variable for each page, e.g., `APP_ROUTER_EVENT_TYPES_ENABLED` which stores a boolean value to determine whether to render the `/event-types` page under the App Router.

Secondly, we added another environment variable `AB_TEST_BUCKET_PROBABILITY` which stores a value between 0 and 100 to ensure the percentage of traffic redirected from the legacy pages to the new pages.

`.env.example`

```jsx
AB_TEST_BUCKET_PROBABILITY=50
APP_ROUTER_EVENT_TYPES_ENABLED=true
```

As you can see below, we added a function called `getBucket` that determines whether to redirect the user to the new page under the App Router using the percentage value from `AB_TEST_BUCKET_PROBABILITY`.

`abTest/utils.ts`

```jsx
import { AB_TEST_BUCKET_PROBABILITY } from "@calcom/lib/constants";

const cryptoRandom = () => {
  return crypto.getRandomValues(new Uint8Array(1))[0] / 0xff;
};

export const getBucket = () => {
  return cryptoRandom() * 100 < AB_TEST_BUCKET_PROBABILITY ? "future" : "legacy";
};
```

#### 3. Migrating the pages

For each page or page group we took the following steps to migrate them from pages router to app router.

#### Migrating `getServerSideProps`

The App Router no longer recognizes the `getServerSideProps` function in the page files. It does not mean though we cannot reuse the existing functions. We introduced the `withAppDirSsr`helper to wrap existing `getServerSideProps` functions for usage inside React Server Components. We pasted its code underneath.

```tsx
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { notFound, redirect } from "next/navigation";

export const withAppDirSsr =
  <T extends Record<string, any>>(getServerSideProps: GetServerSideProps<T>) =>
  async (context: GetServerSidePropsContext) => {
    const ssrResponse = await getServerSideProps(context);

    if ("redirect" in ssrResponse) {
      redirect(ssrResponse.redirect.destination);
    }
    if ("notFound" in ssrResponse) {
      notFound();
    }

    const props = await Promise.resolve(ssrResponse.props);

    return {
      ...props,
      // includes dehydratedState required for future page trpcProvider
      ...("trpcState" in props && { dehydratedState: props.trpcState }),
    };
  };
```

The helper changes the response structure from the `getServerSideProps` function. First of all, it replaces the `{ notFound: Boolean }` objects with a `notFound()` call that actually throws an error inside of it. Similarly, it turns `{ redirect: { destination: String } }` object into a `redirect(destination: string)` function call that throws as well. Lastly, it flattens the values under the `props` key of the response and returns them, taking into account setting the proper key for the dehydrated tRPC state.

The next step is to provide a mock for the `GetServerSidePropsContext` type. Next.js does not provide a function to create such an object based on the new APIs in the App Router. We created it from scratch under the name `buildLegacyCtx`. You can see it below.

`utils.ts`

```tsx
import type { GetServerSidePropsContext } from "next";
import { type ReadonlyHeaders } from "next/dist/server/web/spec-extension/adapters/headers";
import { type ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export type Params = {
  [param: string]: string | string[] | undefined;
};

export type SearchParams = {
  [param: string]: string | string[] | undefined;
};

const createProxifiedObject = (object: Record<string, string>) =>
  new Proxy(object, {
    set: () => {
      throw new Error("You are trying to modify 'headers' or 'cookies', which is not supported in app dir");
    },
  });

const buildLegacyHeaders = (headers: ReadonlyHeaders) => {
  const headersObject = Object.fromEntries(headers.entries());

  return createProxifiedObject(headersObject);
};

const buildLegacyCookies = (cookies: ReadonlyRequestCookies) => {
  const cookiesObject = cookies.getAll().reduce<Record<string, string>>((acc, { name, value }) => {
    acc[name] = value;
    return acc;
  }, {});

  return createProxifiedObject(cookiesObject);
};

export const buildLegacyCtx = (
  headers: ReadonlyHeaders,
  cookies: ReadonlyRequestCookies,
  params: Params,
  searchParams: SearchParams
) => {
  return {
    query: { ...searchParams, ...params },
    params,
    req: { headers: buildLegacyHeaders(headers), cookies: buildLegacyCookies(cookies) },
    res: new Proxy(Object.create(null), {
      get() {
        throw new Error(
          "You are trying to access the 'res' property of the context, which is not supported in App Router"
        );
      },
    }),
  } as unknown as GetServerSidePropsContext;
};
```

You can see an exemplary usage of it below:

```tsx
import type { GetServerSidePropsContext } from "next";
import { cookies, headers } from "next/headers";
import { buildLegacyCtx, type Params, type SearchParams } from "utils";

// equivalent to getServerSideProps function
const getPageProps = async (context: GetServerSidePropsContext) => {
  // do operations using `context`
	return {
		props: {
			...
		},
	};
}

const Page = async ({ params, searchParams }: { params: Params, searchParams: SearchParams }) => {
	const context = buildLegacyCtx(headers(), cookies(), params, searchParams));
	const props = await getPageProps(context);
  return ...
}

export default Page;
```

#### Migrating `getStaticPaths`

Under the App Router, the concept of explicitly declaring static paths in a function has changed in two ways:

1. The function is called `generateStaticParams` instead of `getStaticPaths`,
2. The function must return a string array rather than an object with the array wrapped under the `paths` key.

We provided a small example of the code before:

```tsx
export const getStaticPaths = async () => {
  let paths: { params: { slug: string } }[] = [];

  try {
    const appStore = await prisma.app.findMany({ select: { slug: true } });
    paths = appStore.map(({ slug }) => ({ params: { slug } }));
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientInitializationError) {
      // Database is not available at build time, but that's ok – we fall back to resolving paths on demand
    } else {
      throw e;
    }
  }

  return {
    paths,
    fallback: "blocking",
  };
};

...rest
```

And an example of the code afterward:

```tsx
export const generateStaticParams = async () => {
  try {
    const appStore = await prisma.app.findMany({ select: { slug: true } });
    return appStore.map(({ slug }) => ({ slug }));
  } catch (e: unknown) {
    if (e instanceof Prisma.PrismaClientInitializationError) {
      // Database is not available at build time, but that's ok – we fall back to resolving paths on demand
    } else {
      throw e;
    }
  }

  return [];
};

...rest
```

#### Generate Metadata

Under the Pages Router metadata exist as regular JSX tags that developers may scatter all over the codebase. With the introduction of Next.js App Router, we place the metadata for a particular page into the exported `metadata` object or we generate them using the exported `generateMetadata` function.

Collecting scattered metadata requires analyzing the data flow of the entire page and requires manual work. Due to the fixed nature of several metadata [Cal.com](http://Cal.com) uses, we created a `_generateMetadata` builder function that accepts only two things that change - the title and the description builders based on the translation library.

You can see the example beneath:

```tsx
export const generateMetadata = async () => {
  return await _generateMetadata(
    (t) => t("reset_password"),
    (t) => t("change_your_password")
  );
};
```

#### Internationalization

Given that the App Router lacked native support for internationalization and that [Cal.com](http://Cal.com) at the time used the native support for i18n, we faced the challenge of needing a custom solution.

We had one business requirement - we cannot save or infer the locale (the language and the region) from the URL. It effectively disabled server-side generation for different locales, as such generation relies only on the information in the URL.

To address this, our strategy involved server-side locale calculation, considering:

1. The user's selected locale from the JWE token (if logged in).
2. The value of the `accept-language` header from the request.

This calculated locale was then seamlessly forwarded to the client components, ensuring a smooth internationalization implementation tailored to our project's unique needs.

#### A/B Testing

To reliably test the pages within the app router, we consulted with Vercel an A/B testing solution. The idea was to route a fixed percentage of [Cal.com](http://Cal.com) visitors from any legacy page (one under the Pages Router) to its future counterpart (under the App Router).

Firstly, we decided to control the fixed percentage of routable users using an environment variable. After the algorithm picks a particular user for routing, the routing happens for the next 30 minutes only. This means [Cal.com](http://Cal.com) could either disable all routing, route a fixed percentage of users or 

Secondly, we controlled whether a particular legacy page is routed into its future page counterpart with an environment variable. It allowed us to pick the pages we wanted to enable for testing.

#### 4. Cleaning up (optimizing and refactoring)

In the final phase, we focused on removing legacy pages and adapters, alongside implementing numerous refactors throughout the `app` directory. This effort made code more concise and maintainable.

## Impact & Metrics

#### 1. Developer Experience Improvements

First of all, there is a clear separation between layouts and page components. The structure of each future page is very similar and therefore predictable, hiding many abstractions beneath wrappers.

Secondly, managing the locale has become more explicit and tested due the the migration efforts.

Also, instead of fetching data from the database in a separate function called `getServerSideProps`, [Cal.com](http://Cal.com) engineers can retrieve it directly with the React Server Component.

The translations are no longer fetched using an API route. Instead, they are loaded from the disk space when needed.

Another improvement is the separation between `searchParams` and `params`. Previously `searchParams` and `params` were mixed in a single `query` object. After migration, we have separate hooks to access `searchParams` and `params`.

Furthermore, in the future, if the [Cal.com](http://Cal.com) engineers decide to transition to Server Actions, they will be able to remove the existing API routes managed by tRPC.

#### 2. Performance Improvements

In short, the LCP, in staging environment, on average improved by 33%, moving from 2280 down to 1712.

We considered 3 web vitals to measure the impact of the migration:

1. the **FCP (First Contentful Paint)** is triggered when at least one element with text or image/canvas is rendered on the screen. When SSR is used this metric reflects how fast users will see the page content. However, when some requests are made from the client side (`/event-types` page), FCP will reflect the timing of the empty layout (skeleton). 
2. the **LCP (Largest Contentful Paint)** is triggered when the largest element (image, video, block element that contains a text) is rendered within the viewport. This metric should used carefully because in some cases LCP element is not relevant. For instance, for some pages, the LCP element was the tip image on the sidebar. 
3. the **TBT (Total Blocking Time)** is calculated as the sum of tasks that took more than 50 ms after the FCP trigger. This metric can reflect how fast a page is rendered and becomes interactive. 

Each metric has a weight assigned to it when calculating page score. For pages with SSR, we should focus more on FCP and TBT so the weights of these metrics can be increased. 

To save time on manually measuring web vitals for pages, we built a custom script using the `lighthouse` node module. Furthermore, we created two presets to emulate desktop and mobile devices and selected meaningful audits for SSR pages:

```jsx
const ONLY_AUDITS = [
  "first-contentful-paint",
  "largest-contentful-paint",
  "total-blocking-time",
]
```

Also, to gather more stable results, we measured the web vitals for each page five times and calculated the median value for a series of measurements. 

Local checks are not only needed to prove migration impact but also to catch possible performance regressions before changes are pushed to production. (see learning number 7 below regarding Route Groups). While performance scripts are usually used as tests for detecting performance regressions, we used it as a reporting tool generating reports in JSON format in this case.

#### Web Vitals for main pages:

<details><summary>Desktop:</summary>
<p>

`/booking/[uid]`

|  | FCP | LCP | CLS | Score |
| --- | --- | --- | --- | --- |
| Legacy | 410 | 1235 | 0.03 | 97 |
| Future | 465 | 901 | 0.03 | 99 |

`/bookings/past`

|  | FCP | LCP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- |
| Legacy | 388 | 1406 | 13 | 0.02 | 95 |
| Future | 389 | 1448 | 5 | 0.06 | 94 |

`/event-types` 

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 306 | 2753 | 438 | 10 | 0.03 | 81 |
| Future | 309 | 2573 | 465 | 8 | 0.03 | 82 |

`/teams/` 

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 435 | 4170 | 435 | 2 | 0.03 | 73 |
| Future | 468 | 1389 | 468 | 0 | 0.03 | 95 |

`/apps`

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 464 | 1905 | 645 | 68 | 0.03 | 88 |
| Future | 465 | 1789 | 656 | 69 | 0.03 | 90 |

`/apps/alby`

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 430 | 2209 | 435 | 0 | 0.01 | 81 |
| Future | 429 | 2171 | 432 | 0 | 0 | 87 |

</p>
</details>

<details><summary>Mobile:</summary>
<p>

`/apps/alby`

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 1425 | 10143 | 2554 | 346 | 0.16 | 53 |
| Future | 1275 | 10449 | 2054 | 134 | 0.16 | 62 |

`/apps`

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 2104 | 9056 | 3064 | 943 | 0.16 | 35 |
| Future | 2105 | 8905 | 3095 | 978 | 0.16 | 34 |

`/booking/[uid]`

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 1506 | 5376 | 1506 | 114 | 0.09 | 71 |
| Future | 2105 | 5444 | 2105 | 81 | 0.09 | 71 |

`bookings/past`

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 1506 | 14770 | 1897 | 433 | 0.16 | 53 |
| Future | 1658 | 9133 | 1733 | 296 | 0.16 | 55 |

`/event-types`

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 1275 | 11769 | 1275 | 270 | 0.2 | 55 |
| Future | 1275 | 11581 | 1909 | 223 | 0.16 | 59 |

`/teams`

|  | FCP | LCP | FMP | TBT | CLS | Score |
| --- | --- | --- | --- | --- | --- | --- |
| Legacy | 1575 | 12060 | 1575 | 283 | 0.20 | 53 |
| Future | 2105 | 6359 | 2105 | 119 | 0.20 | 60 |

</p>
</details>

## Learnings

### Before migrations

<details><summary>1. Get buy-in from leadership</summary>
<p>

Migrations are crucial to the survival and growth of any business. but they are considerable investments and without buy-in from the leadership, cannot become successful. we were fortunate to have the support of Peer (Cal CEO) and Keith (Head of Eng) throughout the migration to secure any compute or eng resource we needed along the way.

</p>
</details>

<details><summary>2. Ability to provide accurate enough estimation of migration effort is important</summary>
<p>

Whether to carry out a migration now or later depends on the return on investment. When we started the Cal migration, we underestimated how long it would take to carry out the migration a little bit (after all, we didn’t know all the lessons here). but with practice, our estimation gets better and better and it would be much easier to decide when and why a migration needs to happen and more importantly, secure the required investment to ensure the campaign becomes a success. Breaking down any given migration to different phases, having detailed knowledge of the new framework, and obtaining knowledge from experts of any existing codebase, using code analysis and mining tools, including codemods, could help us to come up with accurate enough estimates.

</p>
</details>

<details><summary>3. Beware, large migrations are not just a technical challenge.</summary>
<p>

Software system we modernize is what runs the whole business of our customers. when modernizing that system, we should have consideration of their end users, business continuity, and the priorities of different teams. the campaign owner and the engineers who are carrying out the migration should be mentally ready for what they are getting into so they can see it through.

</p>
</details>

<details><summary>4. Analyzing the ecosystem is crucial before embarking on a major migration</summary>
<p>

The strength behind Next.js comes not only from the framework but also from all the libraries that create its ecosystem. Since the App Router works under a completely different paradigm, the library creators (like tRPC, Next-Auth, Next-i18Next, etc.) needed to catch up with the changes and release updated versions of their tools. Libraries that were not closely coupled with Next.js did not require any changes. Some libraries solved the problems fixed by the App Router and became obsolete.

Since we did not have the luxury of waiting for all library maintainers to support the App Router, we decided to patch a few libraries, for instance `next-i18next`. We needed to separate the code run on the server side and client side, especially remove the dependency on React.js. 

Thus, in the `serverSideTranslations.js` file, we removed the dependency on `_appWithTranslation` file that contained client-side code.

We started migration on Next.js 13.4.6. Due to a lack of choice, we created custom wrappers for tRPC, which are not needed since 13.5.4.

</p>
</details>

<details><summary>5. Simultaneous support of two versions of a framework during incremental migration negatively impacts RAM and build time and it might even hit tolerable thresholds.</summary>
<p>

After we had migrated over 10 pages to the App Router (meaning we still had the legacy and the future pages), we and [Cal.com](http://Cal.com) realized that the build takes a lot of RAM on Vercel servers. 

We found out that if we import the client-side legacy page from a future page and the former has a heavy dependency in terms of size, this dependency could be bundled two times:

1. with the React Server Component
2. with the Server-Side Rendering

The solution is to move a legacy page component to a separate “use client” file and import it into both the legacy and the future page. 

This was a big issue because, for many devs in the team, it could create OOM (Out Of Memory) issues and waste a lot of time. Besides that, Cal.com has many customers who are self-hosting the app and they could also face the same issue which causes many troubles for them and Cal.com support.

**This solution is codemod-able.**

Alternatively, we came up with two solutions:

1. increase the available RAM on the build server
2. rename the unused future pages so they are not built.

</p>
</details>

<details><summary>6. Allocate margins for unprecedented issues</summary>
<p>

No matter how much expertise we have on a new framework, like Next.js, in large codebases, especially with older dependencies, there is a chance that some unprecedented issue come up and take a considerable amount of time to get fixed. For example, see the module resolution issue mentioned below which is very hard to predict and there are always such rare cases that take up a considerable amount of time to resolve.

</p>
</details>

<details><summary>7. Familiarize yourself with both codebase and product</summary>
<p>

While it would be tempting to hit the ground running and start building, at the start of a project, it would pay dividends if we familiarize ourselves with not only the codebase but also the product and user experience, before rolling up our sleeves and coding.

</p>
</details>

<details><summary>8. Secure dedicated resources for testing</summary>
<p>

Whether it is dedicated QA or not, it is best for someone who has deep context about the expected user experience to test the product. The engineers who are handling the migrations, despite their efforts to test things as much as they can, might miss some issues. We were fortunate that Cal had good testing in place and cooperative engineers who took care of the testing as we shipped migration PRs for them.

</p>
</details>

### Refactoring before/during migrations

<details><summary>9. Unwanted entanglements in the old code might make it harder to adopt new framework features, e.g. the Route Groups</summary>
<p>

Initially, we decided to use the route groups for organizing pages with shared layouts. But, soon we faced some performance regressions. We realized that each page that is part of a group contains runtime dependencies of other pages in that group. Sadly, due to this unwanted entanglement, which is ok in the previous paradigm but not in the new app router paradigm, we needed to move away from route groups.

We tracked this problem to stem from [here](https://github.com/vercel/next.js/blob/canary/packages/next/src/build/webpack/plugins/flight-manifest-plugin.ts), this issues were reported e.g. [here](https://github.com/vercel/next.js/issues/59775).

</p>
</details>

<details><summary>10. Client-side Code / Server-side Code Split</summary>
<p>

We run into a significant number of issues when splitting the code into the server-side and the client-side files, especially when importing code from the legacy pages into the future pages. First of all, we needed to ensure all server-side code does not contain file-level imports of client-side files without the `'use client';` directive, including the recursive dependencies of the imported files.

Even if there is a clear separation, there are still possible leaks of server-side code into the client. If we have an exported function `f` used by the `getServerSideProps` function in the legacy page, then the function will leak to the client.

For instance, if we imported a particular file with a root-level Prisma import from the client and the server side, we need to move such an import into the server-side blocks of code as an asynchronous import.

</p>
</details>

<details><summary>11. Extracting getServerSideProps into Separate Files</summary>
<p>

At the beginning of the migration, we copied the code under the `getServerSideProps` function from the legacy pages into the `getData` function located on the future pages. This made sense under the premise that the Cal.com engineers would not change the functionality of the `getServerSideProps` function before the migrations of a particular page were not completed. Since the migration took longer than expected and the code did change, we decided to move `getServerSideProps` function away from the page files in the pages router to a separate file that could be imported as a server-side code in the future page component with an adapter.

We could not create an adapter that maps the pages-router context into the app-router context with 100% correctness. This is because both contexts are not compatible and cannot be easily converted from one to the other. In the end, we used `@ts-ignore-check` to get rid of the TypeScript errors.

We can move getServerSideProps from one file to the other using common refactoring tools into some IDEs.

</p>
</details>

<details><summary>12. Refactor metadata extraction to enable arguments for the new Generate Metadata API</summary>
<p>

Next.js App Router approach to metadata management requires extracting metadata (like titles and descriptions) from page components, sometimes necessitating database queries. This could lead to duplication of operations in both `generateMetadata` functions (new API in App Router) and server-side components (which existed before), negatively impacting the performance/page load time. We considered two alternatives:

1. Calculate the metadata in the middlewares and pass it using the change of the modified request headers, if possible
2. Allow the two operations to just execute and verify if it impacts the Lighthouse metrics drastically

</p>
</details>

### During migrations

<details><summary>13. Build first then type-check, solving the chicken and the egg problem with the types.</summary>
<p>

During the type check, the TypeScript compiler verifies types coming from the `.next` folder, which are generated during only the build. This means that first, we should build the project (which takes a significant amount of time) and then do the type-check. For a lot of other projects, first, we run the type-check and then we run the build process. If we do that for a Next.js project before building its current version, we might get into a lot of very abstract-looking errors.

</p>
</details>

<details><summary>14. Stacked PR, and leveraging specialized tooling for it, is crucial to facilitate code reviews in large migrations.</summary>
<p>

During the migration, we opened 56 pull requests on the Cal.com repository.

![Open PRs](/img/blog/cal-next-com/open-pull-requests.png)

One problem was that some of those pull requests were interconnected, depending on each other. To mitigate this problem, we used stacked branches through Graphite. Stacked PRs indeed reduced the time for rebasing or resolving merge conflicts.

</p>
</details>

<details><summary>15. Beware of the differences between dev vs prod builds. Successful build in one does not guarantee the other.</summary>
<p>

We experienced differences between the development and the production builds.

For instance, the global error page for errors produced in the root layout fires only in production and not in the dev build.

</p>
</details>

<details><summary>16. Code defensively, if null is allowed, they appear in the large code, case in point: Navigation Types</summary>
<p>

Next.js dynamically generates types for routing based on the project's file structure, specifically for pages within the "Pages" directory and those managed by the App Router. When utilizing navigation hooks like `usePathname`, `useParams`, and `useSearchParams`, there's a distinction in their return values between these two routing contexts. In the Pages Router setup, these hooks might return `null`, indicating a lack of value or parameter, which is not the case under the App Router. This discrepancy can lead to inconsistent type expectations when the same component is used across different routing contexts.

Our learning was to always code defensively, assuming that these hooks might return `null` and handle these cases to avoid runtime errors or type mismatches.

</p>
</details>

<details><summary>17. Be ready to handle rare and unpredictable issues, such as CJS module resolution.</summary>
<p>

Be cautious of dependencies using CJS! Module resolution might become problematic within the API Routes

JavaScript has two major standards for organizing modules:

- CommonJS (CJS) modules, a standard introduced independently from the efforts of Ecma International,
- ECMA Script Modules (ESM/MJS), the standard introduced by Ecma International.

The JavaScript/TypeScript community wants to supersede CJS with ESM over time. The current state of affairs is that we work with projects that contain dependencies supporting either of them or both. The interoperability problem is a question of how to ensure that we can use different ESM and CJS dependencies at the same time without compatibility issues.

If a Next.js project uses the app directory, Next.js will change the SWC loader options for code within the API routes, as explained [here](https://github.com/vercel/next.js/blob/2af1e784c290eba505b2de76ab0e83eb110cf30e/packages/next/src/build/webpack-config.ts#L669). 

During the migration, we found a problem with a library called `libphonenumber-js`. Depending on the running environment, Next.js imports it either as a CJS module or an ESM one.

The problems seem to be manyfold:

1. The `package.json` file available for this library on NPM contains both `main` and `exports` definitions
2. The library contains code that “fixes” the issue with the babel’s default export issue ([link](https://www.npmjs.com/package/babel-plugin-add-module-exports))
3. The problem doesn’t happen at all if a Next.js project doesn’t use the app router
4. The problem will not happen if you use the app router and the API route in question uses the Edge Runtime.

We evaluated 6 different solutions with Cal.com engineers:

1. Forking `libphonenumber-js` and removing the `exports` field,
2. Forking `libphonenumber-js` and removing the babel default export hack,
3. Using a different library or writing the functionality from scratch,
4. Switching to the Edge Runtime for affected API routes,
5. Patching `libphonenumber-js` using `patch-package`
6. Use conditional property access, like below:

```tsx
const m =  await import(path);

const fnc = m?.fnc ?? m?.default?.fnc;
```

Considering the pros and cons of all solutions, we eventually decided to patch the library with `patch-package`, as evident in [this commit](https://github.com/codemod-com/cal.com-demo/commit/139a7c8249b82fe86f92d9a1bf2c27f26ee59516).

</p>
</details>

### After migrations

<details><summary>18. Reduction in code complexity becomes possible after leveraging Next.js new features which remove the need for some external dependencies</summary>
<p>

By moving to the App Router, Cal.com can use RSC (React Server Components) for GET endpoints and Next.js’ cache, alongside Server Actions for POST, PUT, and DELETE operations, eliminating the need for tRPC. The elimination of the tRPC dependency simplifies the codebase, leading to reduced complexity and quicker type-checking processes, enhancing development efficiency and maintainability.

</p>
</details>

## Summary

- Sooner or later, large migrations become inevitable for companies. If done successfully, they unlock new features for users and provide the best developer experience, among other benefits. A good estimation of required efforts is challenging but necessary to objectively and confidently justify and secure the required resources for the migration.
- The official migration guide only provides generically applicable changes and cannot provide a customized process for a given user of that framework, as they might have many business logic, intermediary layers, and customizations.
- Large migrations are not just a purely technical problem. They are also a business and human problem that requires a lot of planning, analysis, tooling, coordination, and effort.
- Specialist tools and talents who have experience in handling large migrations for a given ecosystem can drastically reduce the cost, expedite the migration process, and ensure the successful completion of the migration. With reduced timeline and cost of migrations, many more migrations become viable and software teams can drastically accelerate innovation and attract top talents.
- At Codemod, we are building tools and partnerships to enable progressive software teams to delegate their crucial yet undifferentiated projects to experts with specialized tooling to put these migrations on autopilot. If interested in partnering with us, [contact us](https://codemod.com/contact)!
