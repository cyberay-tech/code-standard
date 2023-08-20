import React, { FunctionComponent, useEffect, useState } from 'react'
/**
 * This file contains the basic rules for writing React components. It is not intended to be exhaustive, but
 * to cover the most common cases.
 *
 * - All components are using default export, i.e. export default MyComponent
 * - Place the component as the initial code within the file, except for any essential types required for its declaration.
 * - File names should follow kebab style and, for components, mirror the component name format, such as farm-detial-page.tsx
 * - Only a single component per file should be exported
 *
 */

/**
 * Function Components
 *
 * Ensure you consistently specify a type, such as FunctionComponent,
 * which enables TypeScript to generate relevant errors when attempting to return anything other than a valid component.
 *
 * Avoid employing inline prop type definitions for exported components.
 */

/**
 * - You can choose both interface and type for props, but be consistent.
 * - You should explicitly specify if the prop is optional or required, using ?. Place all optional props at the end.
 * - You should also specify if the prop can be undefined, using | undefined
 */
interface IFarms {
  name: string
  id: number
  location?: string
}

interface Props {
  label: string
  url: string
  footerText: string | undefined
  show?: boolean
}

const azureFunctionCall = async (
  url: string
): Promise<IFarms[] | undefined> => {
  console.log(url)
  return [{ name: 'farm2', id: 2 }]
}

const isNonEmptyString = (str: string | undefined): str is string => {
    return typeof str === 'string' && str.length > 0
}

const MyFunctionComponent: FunctionComponent<Props> = (props) => {
  const { url, footerText, show = true } = props // Destructure in the function body rather than declaration
  // only destructuring the props under the following conditions:
  // - the property of the props object is used more than once
  // - the property of the props has a default value

  // The implementation adheres to this sequence:

  // Redux hooks
  // useState() hooks
  // useEffect() invocations and associated functions
  // other functions

  // Specify the type of the state variable unless it is a primitive type, and initialise it to a sensible default value.
  // Retain the initial value as undefined only when it's essential.
  const [farms, setFarms] = useState<IFarms[]>([])
  /** Prefer named functions within useEffect and other hooks unless the body is genuinely trivial (one line). This is not compulsory, but it does improve readability. */
  useEffect(function fetchFarms() {
    const results = [{ name: 'farm1', id: 1 }] as IFarms[]
    setFarms(results)
  }, [])
  /**
   * When dealing with async functions or complex dependencies,
   * distinguish the implementation from the useEffect call.
   * The intent should be evident solely from the useEffect line, without the need to consult the actual implementation.
   */
  useEffect(() => {
    fetchImportantData(url)
  }, [url])

  async function fetchImportantData(url: string) {
    // when handling the undefined value, try avoid using the if statement unless it is necessary
    const importantData = (await azureFunctionCall(url)) ?? []

    // the following code is not recommended
    // if (!importantData) {
    //     return;
    // }

    setFarms(importantData)
  }
  /**
   * Functions resembling members and solely utilized within a single component should be defined within the component's body.
   * This approach also permits direct referencing of props and state.
   */
  function getFooterText(): string {
    // for string, explicitly check for undefined and empty string
    return isNonEmptyString(footerText) ? footerText : 'no footer'
  }
  // Single return statement where possible
  // use the ternary operator or && operator to return a value conditionally rather than an if statement
  // DO NOT nest ternary operators
  return show ? (
    <>
      {farms.map((farm) => (
        <p>{farm.name}</p>
      ))}
      <p>{getFooterText()}</p>
    </>
  ) : null
}

export default MyFunctionComponent
