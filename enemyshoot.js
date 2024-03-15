AFRAME.registerComponent("enemy-bullets", {
    init: function () {
        if (document.querySelector("#countMonster").getAttribute("text").value != 0){
            setInterval(this.shootEnemyBullet, 3000)
        }
    },
    shootEnemyBullet: function () {
        //get all enemies using className
        var els = document.querySelectorAll(".enemy");

        
        for (var i = 0; i < els.length; i++) {           

            //enemyBullet entity
            var enemyBullet = document.createElement("a-entity");

            fireball.setAttribute("class","fireball")
            enemyBullet.setAttribute("gltf-model","#fireball");
            fireball.setAttribute("dynamic-body", { mass: 0 });

            var position = els[i].getAttribute("position")

            enemyBullet.setAttribute("position", {
                x: position.x + 0.25,
                y: position.y + 4,
                z: position.z + 0.2,
            });

            fireball.setAttribute("scale", {
                x: 0.25,
                y: 0.25,
                z: 0.25,
            });

            var scene = document.querySelector("#scene");
            scene.appendChild(enemyBullet);


            var position1 = new THREE.Vector3();
            var position2 = new THREE.Vector3();

            //shooting direction
            var enemy = els[i].object3D;
            var player = document.querySelector("#weapon").object3D;

            player.getWorldPosition(position1);
            enemy.getWorldPosition(position2);

            //set the velocity and it's direction
            var direction = new THREE.Vector3();

            direction.subVectors(position1, position2).normalize();

            enemyBullet.setAttribute("velocity", direction.multiplyScalar(10));

            enemyBullet.setAttribute("dynamic-body", {
                shape: "sphere",
                mass: "0",
            });

            var element = document.querySelector("#countLife");
            var playerLife = parseInt(element.getAttribute("text").value);

            //collide event on enemy bullets
            enemyBullet.addEventListener("collide", function (e) {
                if (e.detail.body.el.id === "weapon") {

                    if (playerLife > 0) {
                        playerLife -= 1;
                        element.setAttribute("text", {
                            value: playerLife
                        });
                    }
                    if (playerLife <= 0) {
                        //show text
                        var txt = document.querySelector("#over");
                        txt.setAttribute("visible", true);

                        //remove monsters                        
                        var monsterEl = document.querySelectorAll(".enemy")

                        for (var i = 0; i < monsterEl.length; i++) {
                            scene.removeChild(monsterEl[i])

                        }
                    }

                }
            });
            
        }
    },

});


