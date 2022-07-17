# Object-oriented Canvas Interface
This is an object oriented solution for interfacing with canvas.

## OCI Idea
This is a general idea behind this project. Version 1.1 implements most of the `InnerLayer`. Later on, there will be an `OuterLayer` added that implements features meant for animation and interaction.

- Inner Layer (`core` + `elm` + `tex`)
  - Primitive elements (shapes)
    - Irregular and regular polygons, symmetric polygon presets
    - Ellipses, circles and slices
  - Element connections and transformations (3x3 matrices)
  - Texture definitions (colors, gradients, patterns)
  - Vector-Element intersection tests
    - Polygon triangulation
