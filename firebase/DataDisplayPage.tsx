// DataDisplayPage.tsx

import React from 'react';
import { useFirestoreData } from './useFirestoreData';

export default function DataDisplayPage() {
  const data = useFirestoreData();

  return (
    <div>
      <h1>Data Display</h1>
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            {item.id}
            <div>
              <a>
                Title: {item.title} / Author: {item.author} / Price: {item.price}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}