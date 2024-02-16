---
slug: crafting-elegant-code
title: "Crafting “elegant” code that grows with you"
authors: [alex]
---

<head>
  <meta property="og:site_name" content="Codemod.com" />
  <meta content="Crafting “elegant” code that grows with you" property="og:title"/>
  <meta content="Learn how to make your codebase more adaptable and maintainable using codemods. Discover the key factors—like consistency, simplicity, documentation, test coverage, modularity, API stability, and abstraction—that make code easier to update and scale." property="og:description"/>
  <meta name='og:image' content='https://codemodcom.mintlify.app/api/og?division=Blog&title=Crafting%20%E2%80%9Celegant%E2%80%9D%20code%20that%20grows%20with%20you&logoLight=https%3A%2F%2Fmintlify.s3-us-west-1.amazonaws.com%2Fcodemodcom%2Flogo%2Fcodemod-logo-light.svg&logoDark=https%3A%2F%2Fmintlify.s3-us-west-1.amazonaws.com%2Fcodemodcom%2Flogo%2Fcodemod-logo-dark.svg&primaryColor=%230B151E&lightColor=%23D6FF62&darkColor=%230B151E'/>

  <meta content="@codemod" name="twitter:site"/>
  <meta content="summary_large_image" name="twitter:card"/>
  <meta content="Crafting “elegant” code that grows with you" name="twitter:title"/>
  <meta content="Learn how to make your codebase more adaptable and maintainable using codemods. Discover the key factors—like consistency, simplicity, documentation, test coverage, modularity, API stability, and abstraction—that make code easier to update and scale." name="twitter:description"/>
  
  <meta name='twitter:image' content='https://codemodcom.mintlify.app/api/og?division=Blog&title=Crafting%20%E2%80%9Celegant%E2%80%9D%20code%20that%20grows%20with%20you&logoLight=https%3A%2F%2Fmintlify.s3-us-west-1.amazonaws.com%2Fcodemodcom%2Flogo%2Fcodemod-logo-light.svg&logoDark=https%3A%2F%2Fmintlify.s3-us-west-1.amazonaws.com%2Fcodemodcom%2Flogo%2Fcodemod-logo-dark.svg&primaryColor=%230B151E&lightColor=%23D6FF62&darkColor=%230B151E'/>
</head>

Learn how to make your codebase more adaptable and maintainable using codemods. Discover the key factors—like consistency, simplicity, documentation, test coverage, modularity, API stability, and abstraction—that make code easier to update and scale.

<!--truncate-->

---

When you start a greenfield project, AI allows you to ship at the speed of thought. However, as your project grows in size, your code may not evolve as quickly as you would like. It doesn't have to be this way. Andrew and I would love to refer to such code as "elegant," which has a straightforward definition.

![Andrew Clark's Tweet](/img/blog/crafting-elegant-code/andrew-clark-tweet.jpeg)

The term "codemod" refers to a tool that assists developers in making systematic changes to their source code. A codebase becomes more "codemod-able" when it is structured in a way that allows for these automated modifications to be performed easily and reliably. With that, fleet-wide modernization becomes possible, and that’s crucial especially as the size of codebases grows exponentially thanks to AI. 

Here are some factors that can make code more or less amenable to codemodding:

1. **Consistency**: If the code follows consistent patterns and styles, it's easier to apply a codemod because the tool can predictably identify the parts that need changes.
    - **More codemod-able**: Functions and methods follow a consistent naming convention, making it easier to target them.
        
        ```jsx
        function calculateTotal() { /*...*/ }
        function calculateDiscount() { /*...*/ }
        ```
        
    - **Less codemod-able**: Inconsistent naming makes it difficult to identify related functions.
        
        ```jsx
        function calcTotal() { /*...*/ }
        function getDiscountAmount() { /*...*/ }
        ```
        
2. **Complexity**: Simpler, less complex code with fewer dependencies is typically easier to modify with a codemod.
    - **More codemod-able**: Simple, single-purpose functions.
        
        ```python
        def add(a, b):
            return a + b
        
        ```
        
    - **Less codemod-able**: Nested functions with complex logic.
        
        ```python
        def calculate(a, b, option):
            if option == 'add':
                def add(x, y):
                    return x + y
                return add(a, b)
            # More complex logic...
        ```
        
3. **Documentation and Comments**: Well-documented code with clear comments can help the developers who write codemods understand the intended behavior of the code, making it easier to ensure the codemod doesn't introduce errors.
    - **More codemod-able**: Code with clear comments.
        
        ```java
        // Multiplies input by two
        int doubleNumber(int number) {
            return number * 2;
        }
        ```
        
    - **Less codemod-able**: Code without comments.
        
        ```java
        int doubleNumber(int number) {
            return number * 2;
        }
        ```
        
4. **Test Coverage**: Having a comprehensive suite of tests allows developers to ensure that the codemod has not broken any existing functionality.
    - **More codemod-able**: Code accompanied by tests.
        
        ```jsx
        function add(a, b) { return a + b; }
        console.assert(add(2, 2) === 4);
        ```
        
    - **Less codemod-able**: Code with no tests.
        
        ```jsx
        function add(a, b) { return a + b; }
        ```
        
5. **Modularity**: Code that is modular and composed of small, single-responsibility functions or classes is easier to target with codemods because changes can be isolated to specific modules without affecting others.
    - **More codemod-able**: Code organized in modules or classes.
        
        ```tsx
        class Calculator {
            add(a: number, b: number) { return a + b; }
        }
        ```
        
    - **Less codemod-able**: All logic in a single file or function.
        
        ```tsx
        function calculate(a: number, b: number, op: string) {
            if (op === 'add') { return a + b; }
            // More operations...
        }
        ```
        
6. **API Stability**: If the code relies on APIs that are stable and backward compatible, codemods can be written with the confidence that the API contract won't change unexpectedly.
    - **More codemod-able**: Using well-established libraries or APIs.
        
        ```python
        import requests
        response = requests.get('<https://api.example.com/data>')
        
        ```
        
    - **Less codemod-able**: Using custom, frequently changing APIs.
        
        ```python
        import myCustomApi
        response = myCustomApi.get('<https://api.example.com/data>')
        
        ```
        
7. **Abstraction Level**: Code that operates at a higher level of abstraction may be easier to codemod because changes can be made at the abstraction level rather than having to account for many low-level details.
    1. **Abstraction Level**:
        - **More codemod-able**: High-level abstractions.
            
            ```csharp
            public interface IShape {
                void Draw();
            }
            ```
            
        - **Less codemod-able**: Low-level, detailed implementations.
            
            ```csharp
            public class Circle {
                // Complex drawing logic involving graphics primitives
            }
            ```
            

Making code more "codemod-able" often involves cleaning up and refactoring the codebase to improve these aspects, which not only facilitates the use of codemods but generally leads to a cleaner, more maintainable, and more robust codebase.