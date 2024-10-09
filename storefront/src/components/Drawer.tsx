// External components
import * as React from "react"
import { useSwipeable } from "react-swipeable"

// Components
import { Icon } from "./"
import { twJoin, twMerge } from "tailwind-merge"

export interface DrawerProps extends React.ComponentPropsWithoutRef<"div"> {
  isOpened?: boolean
  onCloseClick?: () => void
  onBackdropClick?: () => void
  onSwipeRight?: () => void
}

export const Drawer: React.FC<DrawerProps> = ({
  children,
  isOpened,
  onCloseClick,
  onBackdropClick,
  onSwipeRight,
  ...rest
}) => {
  const swipeHandlers = useSwipeable({
    onSwipedRight: onSwipeRight,
    trackMouse: true,
  })

  return (
    <>
      <div
        {...swipeHandlers}
        {...rest}
        className={twMerge(
          "flex-col items-center bg-grayscale-white top-0 right-0 z-50 fixed justify-self-center w-full max-h-screen h-screen max-w-93",
          isOpened
            ? "opacity-100 visible translate-x-0"
            : "opacity-0 invisible translate-x-full"
        )}
        style={{
          transition: isOpened
            ? "transform 500ms, opacity 200ms, visibility 100ms"
            : "transform 300ms, opacity 200ms, visibility 100ms",
        }}
      >
        <button className="absolute top-12 right-12" onClick={onCloseClick}>
          <Icon name="close" className="w-6" />
        </button>
        <div className="w-full overflow-y-scroll p-12">{children}</div>
      </div>
      <div
        onClick={onBackdropClick}
        className={twJoin(
          "w-full h-full  fixed top-0 left-0 z-40 bg-grayscale-black duration-300",
          isOpened ? "visible opacity-10" : "invisible opacity-0"
        )}
      />
    </>
  )
}