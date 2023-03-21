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
      },
    };
  }(window, window._))