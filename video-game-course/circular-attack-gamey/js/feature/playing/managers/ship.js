(function(window, opspark, _) {
  // create a namespace for the ship manager //
  _.set(opspark, 'playa.ship',
    /**
     * Creates and returns the ship manager.
     */
    function(assets, controls, messenger, projectile, emitter, level, keyMap) {
      // default key map //
      keyMap = keyMap || {
        UP: controls.KEYS.UP,
        LEFT: controls.KEYS.LEFT,
        RIGHT: controls.KEYS.RIGHT,
        FIRE: controls.KEYS.SPACE,
        DOWN: controls.KEYS.DOWN,
        F: controls.KEYS.F,
        SHIFT_RIGHT: controls.KEYS.SHIFT_RIGHT,
      };
      
      let 
        ship, 
        fire;
        
      setRateOfFire(level.rateOfFire);

      function explode() {
        let i, id;

        ship.alpha = 0;

        // show the player explosion for a short period of time //
        i = 0;
        id = setInterval(function() {
          ship.explosion.emit({ x: ship.x, y: ship.y });
          if (i > 60) {
            window.clearInterval(id);
            ship.explosion.stop();
            emitter.destroy();
            messenger.dispatch({ type: 'DESPAWN', bodies: [ship], source: 'ship' });
          }
          i++;
        }, 17);
      }
      
      function setRateOfFire(value) {
        fire = _.throttle(player => projectile.fire(player), value, { 'trailing': false });
      }

      function inertia() {
        if (ship.velocityX > 0){
          ship.velocityX -= 0.01;
        }
        if (ship.velocityX < 0){
          ship.velocityX += 0.01;
        }
        if (ship.velocityY > 0){
          ship.velocityY -= 0.01;
        }
        if (ship.velocityY < 0){
          ship.velocityY += 0.01;
        }
      }
      
      function handleCollisionShip(impact) {
        if (this.integrity > 0) {
          this.integrity -= impact;
          messenger.dispatch({ type: 'DAMAGE', source: 'ship', target: this });
          if (this.integrity <= 0) {
            explode();
            messenger.dispatch({ type: 'EXPLOSION', source: 'ship', target: this });
          }
        }
      }

      // return the ship manager api //
      return {
        spawn(color = '#4286f4') {
          if(ship) throw new Error('Player is already spawned!');
          // only one ship is managed by the module //
          ship = assets.makeShip(color);
          ship.handleCollision = handleCollisionShip;
          messenger.dispatch({ type: 'SPAWN', bodies: [ship], source: 'ship' });
          return this;
        },
        setRateOfFire,
        setKeyMap(map) {
          keyMap = map;
          return this;
        },
        update(event) {
          // left and right arrows cannot be pressed at the same time //
          if (controls.isActive(keyMap.LEFT)) {
            if (controls.isActive(keyMap.F)){
              ship.rotationalVelocity = -1;
            } else {
            ship.rotationalVelocity = -5;
            }
          } else if (controls.isActive(keyMap.RIGHT)) {
            if (controls.isActive(keyMap.F)){
              ship.rotationalVelocity = 1;
            } else {
            ship.rotationalVelocity = 5;
            }
          } else {
            ship.rotationalVelocity = 0;
          }

          // up arrow can be pressed in combo with other keys //
          if (controls.isActive(keyMap.UP)) {
            emitter.emit(ship.getExhaustPoint());
            ship.propulsion = 0.1;
          } else if (controls.isActive(keyMap.DOWN)){
            ship.propulsion = -0.075;
          } else {
            emitter.stop();
            ship.propulsion = 0.0;

            inertia();
          }
          
          /*
           * Space key can be pressed in combo with other keys.
           * Throttle the rateOfFire using _.throttle based on
           * level.rateOfFire.
           */

          if (controls.isActive(keyMap.FIRE)) {
            fire(ship);
          }
        },
      };
    });
}(window, window.opspark, window._));
