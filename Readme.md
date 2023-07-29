# Object-oriented Canvas Interface

OCI provides an easy but not over-simplified way to design an interactive app with the use of an HTML canvas. It heavily emphasises OOP design and can be used for 2D scenes, animations, mini-games etc.


### Hierarchy overview

This is not a full list of features but only the most significant components that help to understand how OCI functions.

- `CanvasInterface`
  A parent class for your canvas app. It is tied to a single HTML Canvas element that should not be interacted with outside of the framework.
  - `CanvasView`
  Provides a way to move the "camera". The view can be moved, rotated and scaled (zoom in/out)


- `Element`
  2D element displayed on the canvas. It can have other elements attached so that they follow the transformations of the parent element.
  - `Shape`
  This property determines the shape of the element. There are some predefined shapes but the user can also create their own from a list of vertices.
  - `Texture`
  Container for various drawing procedures. It can be shared between multiple elements.
    - `Component`
    Defines a piece of an element that can be drawn. For example outline, fill, shadow etc. There also are components solely for development purposes - center point, bounding box. It can be shared between multiple textures.
      - `Style`
      Each component can be drawn with a certain style. Usually the style is a simple color but it can also be an image, a repeating patern etc. It can be shared between multiple components.
