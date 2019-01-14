import React from 'react';
import {Body} from '../components';

export default function Explore() {
  return (
    <Body>
      <div className="embed-responsive embed-responsive-1by1">
        <iframe
          className="embed-responsive-item"
          src="http://localhost:5601"
          allowFullScreen
        />
      </div>
    </Body>
  );
}
