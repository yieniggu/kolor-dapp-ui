import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const Dropdown = ({ options, selectedOption, setSelectedOption }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="font-grotesque inline-flex w-full justify-center rounded-md border border-accent-light bg-transparent px-4 py-2 font-medium text-accent-light shadow-sm hover:bg-accent-light hover:text-accent-opaque focus:outline-none focus:ring focus:ring-accent-opaque focus:ring-offset-2 focus:ring-offset-main-light">
          {options[selectedOption]}
          <ChevronDownIcon
            className="my-auto ml-2 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right divide-y divide-gray-100 text-accent-light rounded-md bg-accent-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            {options.map((option, idx) => (
              <Menu.Item>
                {({ active }) => (
                  <a
                    onClick={() => setSelectedOption(idx)}
                    className={classNames(
                      active
                        ? "bg-accent-opaque text-accent-light"
                        : "text-main-dark",
                      "block px-4 py-2 cursor-pointer"
                    )}
                  >
                    {option}
                  </a>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};
