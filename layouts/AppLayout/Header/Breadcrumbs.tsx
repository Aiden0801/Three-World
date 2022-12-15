import { capitalize } from '@/lib/text-helpers'
import { Breadcrumbs, Anchor, BreadcrumbsProps } from '@mantine/core'
import { IconChevronRight, IconHome } from '@tabler/icons'
import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode } from 'react'

const items = [
  { title: 'Mantine', href: '#' },
  { title: 'Mantine hooks', href: '#' },
  { title: 'use-id', href: '#' },
].map((item, index) => (
  <Anchor href={item.href} key={index}>
    {item.title}
  </Anchor>
))

export function BreadCrumbsNav(props: Omit<BreadcrumbsProps, 'children'>) {
  const router = useRouter()
  const breadcrumbs = generateBreadcrumbs(router)
  console.log(breadcrumbs)
  return (
    <>
      <Breadcrumbs {...props} separator={<IconChevronRight size={20} stroke={1} />}>
        {breadcrumbs.map((crumb, idx) => (
          <Link href={crumb.href} key={idx} passHref>
            <Anchor size="sm" transform="uppercase" sx={flex()}>
              {crumb.text}
            </Anchor>
          </Link>
        ))}
      </Breadcrumbs>
    </>
  )
}

function flex() {
  return {
    display: 'flex',
    alignItems: 'center',
    height: '100%',
  }
}

/**
 * @dev since our `Home` is technically /dashboard, should we refactor this
 * to take that into account?
 */
function generateBreadcrumbs(
  router: NextRouter
): { href: string; text: ReactNode }[] {
  // Remove any query parameters, as those aren't included in breadcrumbs
  const path = router.asPath.split('?')[0]
  const parts = path
    .split('/')
    .filter((v) => v.length > 0)

  // Iterate over the list of nested route parts and build
  // a "crumb" object for each one.
  const crumblist = parts.map((subpath, idx) => {
    // We can get the partial nested route for the crumb
    // by joining together the path parts up to this point.
    const href = '/' + parts.slice(0, idx + 1).join('/')
    // The title will just be the route string for now
    const text = capitalize(subpath)
    return { href, text }
  })

  // Add in a default "Home" crumb for the top-level
  return [{ href: '/', text: <IconHome size={20} stroke={2} /> }, ...crumblist]
}
