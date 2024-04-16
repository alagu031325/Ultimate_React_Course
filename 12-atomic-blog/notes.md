## Lecture : Performance optimization and Wasted Renders:

### Prevent Wasted Renders

- we can memomise components using memo
- we can memomise objects and functions using useMemo and useCallback hooks
- we can also pass elements into other elements as children prop or regular prop in order to prevent them from being re-rendered

### Improve App Speed/Responsiveness

- we can use useMemo/useCallback hooks
- we can also use modern useTransition hook to improve app speed

### Reduce Bundle Size

- by using fewer third party packages in our code base
- Implement code splitting and lazy loading

_NOTE: We should also follow other optimization best practices in React like not defining components inside other components and much more..._

### When does a component instance re-renders?

**In React a component instance only gets re-rendered in 3 different situations**

1. Whenever a component's state changes
2. Whenever the context within which the component exists changes (only if the component is consuming the context - because mostly all components are already created and passed as children prop)
3. Whenever a component re-renders all its child components are also re-rendered (Parent component re-rendering)

_NOTE: Rendering a component does not mean that the DOM actually gets updated, it just means the component function gets called and React will create a new virtual DOM and does diffing and reconciliation_

**Wasted Render: is a render that didnt produce any change in the DOM, so it is a waste because all the diffing calculations still had to be done but didnt result in any new DOM update - It becomes a problem when re-renders happen too frequently or when the component is very slow**

## Lecture : Profiler Developer Tool

- With profiler we can analyse renders and re-renders
- We can see which components have rendered and why they are rendered and how long each render took

## Lecture : Surprising Optimization Trick with Children prop

- To avoid all children components to be re-rendered while the parent component is re-rendered we can pass them as children prop - see Test.js - since the children prop is already created and passed into the component - react is smart enough to know that the children prop will not be affected by the re-render

## Understanding MEMO

### Memoization

- is an optimization technique that executes a pure function one time and stores the result in memory(cache) - If we try to execute the same function again with the same arguments as before, the previously saved result will be returned from the cache, without executing the function again
- The function will be executed again only if the inputs are different and new the results will be calculated
- In React we can use this technique to optimize our applications
- We can use memo function to memoize components
- We can use useMemo to memoize objects
- We can use useCallback to memoize functions
- This will help us to prevent wasted renders and Improve app speed/responsiveness

### MEMO Function

- React has memo function and we can use this to create a component that will not re-render when its parent re-renders as long as the props stay the same between renders. Memoizing a component in React means do not re-render it if props stay the same across renders.
- If a component re-renders, memoized child component doesn't re-render as long as it receives the same props, if it receives new data(props) then memoized child re-renders
- Memoizing a component only affects the props! A memoized component will still re-render when its own state changes or when a context that the component is subscribed to changes - because in these two situations the component has a new data that needs to be displayed in the UI
- Memo is only useful when dealing with heavy component(a component that creates a visible lack or delay when its rendered), or when components re-renders frequently and it should do so with the same props

### Understanding useMemo and useCallback

- An issue with Memo: Whenever a component instance re-renders everything in there is re-created - so all values are created again including objects and functions that are defined within the component
- A new render gets new objects and new functions even when they are exactly the same as before
- In JS, two objects or functions that look the same are actually two unique different objects
- So if we pass a function or an object to a child component as a prop, then the child component will always see them as new props whenever their is a re-render - so if props are different between renders then memo will simply not work
- In summary if we memoize a component and then give an object or function as a prop, the component will always re-renders eventhough the contents of the props didnt change
- Solution for this issue is to memoize objects and functions to make them stable - we can preserve them between renders by memoizing them aswell - to do that we have two hooks in React(useMemo/useCallback)

#### useMemo()

- We can use useMemo to memoize any values that we want to preserve between renders and useCallback(special case of useMemo) to memoize functions between renders
- Whatever value we pass into useMemo and useCallback will be stored in memory(cached) and that cached value will be returned in subsequent re-renders - so it will be preserved across renders as long as the inputs(dependencies) stay the same
- So similar to useEffect hook useMemo and useCallback will also have a dependency array - whenever one of the dependency changes, the value will no longer returned from the cache - instead it will be re-created
- When we memoize a value, no new value is created on re-render as long as the dependency dont change - cached value is returned and it will be stable across renders and when the dependencies change then the new value is created as if memoization has never happened

#### 3 main use cases

- We need to make objects or functions stable in order to make the memo function work - if props are objects or functions then we need to memoize the props to prevent wasted renders
- Memoizing values to avoid expensive re-calculations on every render (we can simply preserve the result of the calculation across renders using useMemo - React doesnt recalculates it on each render)
- Memoizing values that are used in dependency array of another hook, for example to avoid infinite useEffect loopss
