import React from 'react';
import Particles from 'react-tsparticles';
import particelsConfig from './config/particalConfig';

export default function ParticalsBackground() {
  return (
    <Particles params={particelsConfig}></Particles>
  )
}
