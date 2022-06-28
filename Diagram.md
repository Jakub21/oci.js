# Project diagram
- `property class`
- `/inherited class`
- `[group] (group of classes with similar function that have no common parent)`



- `core.Vector`
- `core.CanvasInterface`
  - `core.CanvasView`
  - `core.ElementStore`
    - `core.Element`
      - `core.Box`
      - `core.Transform`
      - `tex.Texture`
        - `tex.Component`
          - `/tex.Outline`
          - `/tex.Fill`
          - `/tex.Shadow`
          - `/tex.Text`
            - `tex.Font`
          - `[Component styles]`
            - `/tex.Color`
            - `/tex.Pattern`
            - `/tex.Image`
            - `/tex.Gradient` (3 types, TBD)
        - `/elm.Polygon`
          - `/elm.Rectangle`
          - `/elm.RegularPolygon`
          - `/elm.StarPolygon`
          - `/elm.RadialPolygon`
          - `/elm.MirroredPolygon`
          - `core.Triangle`
            - `core.Line`
        - `/elm.EllipseSlice`
          - `/elm.Ellipse`
          - `/elm.CircleSlice`
            - `/elm.Circle`
  - `ctrl.Controls`
    - TBD
