// Trying to get a handle on the "expression problem"
// https://craftinginterpreters.com/representing-code.html#the-expression-problem


// https://www.kirillvasiltsov.com/writing/visitor-pattern-typescript/

/**
 * You may have noticed that there is no need to call the Drawable interface Drawable. 
 * That is true. ShapeVisitor can be implemented by many different classes, 
 * not just Drawer but also Filesystem or Animate or whatever. 
 * We want to be able accept all of them without editing every shape class. 
 * That's why it probably makes sense to just call it VisitableShape or something.
 */
interface Drawable {
    name: string;
  accept(visitor: ShapeVisitor): void
}

interface ShapeVisitor {
  visitCircle(shape: Circle): void
  visitSquare(shape: Square): void
  visitTriangle(shape: Triangle): void
}

class Drawer implements ShapeVisitor {
  visitCircle(shape: Circle) {
      console.log(`drawing a circle: ${shape.name}`)
  }

  visitSquare(shape: Square) {
      console.log(`drawing a square: ${shape.name}`)
  }

  visitTriangle(shape: Triangle) {
      console.log(`drawing a triangle: ${shape.name}`)
  }

  draw(shape: Drawable) {
    shape.accept(this)
  }
}

class Square implements Drawable {
    name = ''

    constructor(name: string) {
        this.name = name
    }

  accept(visitor: ShapeVisitor) {
    visitor.visitSquare(this)
  }
}

class Circle implements Drawable {
    name = ''

    constructor(name: string) {
        this.name = name
    }
  accept(visitor: ShapeVisitor) {
    visitor.visitCircle(this)
  }
}

class Triangle implements Drawable {
    name = ''

    constructor(name: string) {
        this.name = name
    }
  accept(visitor: ShapeVisitor) {
    visitor.visitTriangle(this)
  }
}

// ----------------------------------------

const visitorThatDraws = new Drawer()
const square = new Square('sq 1')
const triangle = new Triangle('tri 1')

visitorThatDraws.draw(square)
visitorThatDraws.draw(triangle)

