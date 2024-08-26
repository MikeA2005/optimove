import { Link } from '@inertiajs/react'
import { Avatar, Dropdown } from 'flowbite-react'

function UserDropdown({ user }) {
  return (
    <Dropdown 
        className='flex items-center justify-start rtl:justify-end'
        arrowIcon={false}
        inline
        label={
            <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
        }
    >
        <Dropdown.Header>
            <span className='block text-sm'>
                {user.name}
            </span>
            <span className='block truncate text-sm font-medium'>
                {user.email}
            </span>
        </Dropdown.Header>

        <Dropdown.Item href={route('profile.edit')} as={Link}>
            Profile
        </Dropdown.Item>

        <li role="menuitem">
            <Link 
                href={route('logout')}
                method='post'
                as="button"
                className="flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:bg-gray-600 dark:focus:text-white" 
                tabIndex="-1"
            >
                Sign out
            </Link>
        </li>
    </Dropdown>
  )
}

export default UserDropdown