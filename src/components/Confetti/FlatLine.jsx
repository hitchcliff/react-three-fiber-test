import React, { useRef, useState } from 'react'

import * as THREE from 'three';
import { extend, useFrame } from 'react-three-fiber';
import * as meshline from './MeshLine';

extend(meshline)
const colors = ['#A2CCB6', '#FCEEB5', '#EE786E', '#EE786E'];

const FlatLine = () => {
    const material = useRef();
    const [color] = useState(() => colors[parseInt(Math.random() * colors.length)]);
    const [ratio] = useState(() => 0.5*0.5 * Math.random())
    const [width] = useState(() => Math.max(0.1, 0.3 * Math.random()));
    const [curve] = useState(() => {
        let pos = new THREE.Vector3(30 - 60 * Math.random(), -5, 10 - 20 * Math.random())
        return new Array(30).fill().map(() => pos.add(new THREE.Vector3(2 - Math.random() * 4, 4 - Math.random() * 2, 5 - Math.random() * 10)).clone())
    })


    // meshline
    const meshLineOnUpdate = (self) => {
       return self.parent.geometry = self.geometry
    }

    // geometry
    const geometryOnUpdate = (self) => {
        console.log(self)
        return self.parent.setGeometry(self);
    }

    // catmull
    const catmullOnUpdate = (self) => {
        return self.parent.vertices = self.getPoints(500)
    }

    // useFrame(() => (material.current.uniforms.dashOffset.value -= 0.0005))
    console.log('hello from flatline')

    return (
        <mesh>
            <meshLine onUpdate={meshLineOnUpdate}>
                <geometry onUpdate={geometryOnUpdate}>
                    <catmullRomCurve3 args={[curve]} onUpdate={catmullOnUpdate} />
                </geometry>
            </meshLine>
            <meshLineMaterial attach="material" ref={material} transparent depthTest={false} lineWidth={width} color={color} dashArray={0.1} dashRatio={ratio} />
        </mesh>
    )
}

export default FlatLine 
