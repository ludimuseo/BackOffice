import type { FC } from 'react'

const CoreSidebar: FC = () => {
  return (
    <>
      <aside id="sidebar">
        <ul className="menu w-56 rounded-box bg-base-200">
          <li>
            <a>Item 1</a>
          </li>
          <li>
            <details open>
              <summary>Parent</summary>
              <ul>
                <li>
                  <a>Submenu 1</a>
                </li>
                <li>
                  <a>Submenu 2</a>
                </li>
                <li>
                  <details open>
                    <summary>Parent</summary>
                    <ul>
                      <li>
                        <a>Submenu 1</a>
                      </li>
                      <li>
                        <a>Submenu 2</a>
                      </li>
                    </ul>
                  </details>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <a>Item 3</a>
          </li>
        </ul>
      </aside>
    </>
  )
}
export default CoreSidebar
