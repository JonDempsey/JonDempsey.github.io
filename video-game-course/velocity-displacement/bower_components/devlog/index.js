(function(window, _) {
  window.devlog = window.devlog || {
    numz: {

      /**
      * @param {Object[]} pointA first point's (x,y) value.
      * @param {number} pointA.x first point's x value.
      * @param {number} pointA.y first point's y value.
      * @param {Object[]} pointB second point's (x,y) value.
      * @param {number} pointB.x second point's x value.
      * @param {number} pointB.y second point's y value.
      */
      getAngleDegrees(pointA, pointB) {
        const
          distanceX = pointB.x - pointA.x,
          distanceY = pointB.y - pointA.y,
          radians = Math.atan2(distanceY, distanceX),
          degrees = radians * 180 / Math.PI;
        return degrees;
      },

      /**
      * @param {number} degrees angle measure in degrees form.
      */
      degreesToRadians(degrees) {
        return degrees * Math.PI / 180;
      },

      /**
      * @param {number} radians angle measure in radians form.
      */
      radiansToDegrees(radians) {
        return radians * 180 / Math.PI;
      },


    },
    phyz: {

      getDistance(pointA, pointB) {
        const
          distanceX = pointB.x - pointA.x,
          distanceY = pointB.y - pointA.y,
          distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
        return distance;
      },

      makeBody: function(type, {
        velocityX = 0,
        velocityY = 0,
        rotationalVelocity = 0,
        integrity = 1,
        density = 1,
        volatility = 0
      } = {}) {
        if (type === undefined) throw new Error('You must provide a valid String for the type parameter!');
        return {
          type: type,
          velocityX: velocityX,
          velocityY: velocityY,
          rotationalVelocity: rotationalVelocity,
          integrity: integrity,
          density: density,
          volatility: volatility,

          handleCollision(impact, body) {
            // template method //
          },

          update(event) {
            // template method //
          },
        };
      },
      /**
           * Updates the diagonal velocity properties of a body,
           * taking into account the body's current velocity
           * and applying any forces acting against the body
           * as acceleration on both the x and y axis.
           *
           * NOTE: This method DOES NOT update the position of the body, it only updates its velocity.
           *
           * @param {Object} body: The body must be an Object
           * with velocityX, velocityY and rotation properties.
           * @param {Number} forceOnX: The force acting against
           * the body on the x axis.
           * @param {Number} forceOnY: The force acting against
           * the body on the y axis.
           */
      updateVelocity(body, forceOnX, forceOnY) {
        const
          angle = body.rotation * Math.PI / 180,
          accelerationOnX = Math.cos(angle) * forceOnX,
          accelerationOnY = Math.sin(angle) * forceOnY;
        body.velocityX += accelerationOnX;
        body.velocityY += accelerationOnY;
      },

      /**
       * Updates the x and y properties of a body based on its
       * velocityX and velocityY, and, updates the rotation of
       * a body based on its rotationalVelocity.
       * 
       * @param {Object} body: The body must be an Object
       * with x, y, rotation, velocityX, velocityY, and
       * rotationalVelocity properties.
       */
      updatePosition(body) {
        body.x += body.velocityX;
        body.y += body.velocityY;
        body.rotation += body.rotationalVelocity;
      },
    },
  };
}(window, window._))