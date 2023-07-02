// DataDisplayPage.tsx

import React, { useEffect, useSt
import { initializeApp } from 'f
import { getFirestore, collectio
//import { TagDisplay } from './

// Firebaseの設定と型定義

interface TagFields {
  [key: string]: boolean;
}

interface FirestoreData {
  id: string;
  title: string;
  author: string;
  price: number;
  tag: TagFields;
}

const firebaseConfig = {
    apiKey: "AIzaSyDeT3DgOkSe0Ps
    authDomain: "predate-032.fir
    projectId: "predate-032",
    storageBucket: "predate-032.
    messagingSenderId: "59039270
    appId: "1:590392707099:web:9
    measurementId: "G-FTVDCJRC4X
};



// タグ名のリスト。ここを編集す
const tagList: string[] = ['Able




export function useFirestoreData
  const [data, setData] = useSta

  useEffect(() => {
    const app = initializeApp(fi
    const db = getFirestore(app)

    const fetchData = async () =
      try {
        const querySnapshot = aw
        const fetchedData: Fires

        querySnapshot.forEach((d
          const { title, author,
          fetchedData.push({
            id: doc.id,
            title,
            author,
            price,
            tag,
          });
        });

        setData(fetchedData);
      } catch (error) {
        console.error('Error fet
      }
    };

    fetchData();
  }, []);

  return data;
}

const sortPriority: { [key: stri
  Able: 1,
  Bravo: 2,
  Charley: 3,
};

const customSort = ([a]: [string
  const priorityA = sortPriority
  const priorityB = sortPriority

  return priorityA - priorityB;
};

export default function DataDisp
  const data = useFirestoreData(
  const [selectedTags, setSelect

  const handleTagSelect = (tagNa
    setSelectedTags((prevSelecte
      if (prevSelectedTags.inclu
        // タグが既に選択されて
        return prevSelectedTags.
      } else {
        // タグが選択されていな
        return [...prevSelectedT
      }
    });
  };

  const filteredData = data.filt
    if (selectedTags.length === 
      // 選択されたタグがない場
      return true;
    }

    // 選択されたタグに一致する
    return selectedTags.every((t
  });

  

  return (
    <div>
      <h1>Data Display</h1>

      <div className='Tagsellect
        Selected Tags: {selected
      </div>

      <div>
        {tagList.map((tag) => (
          <button key={tag} onCl
            Toggle {tag}
          </button>
        ))}
      </div>

      {filteredData.map((item) =
        <ul className="itemflex"
          <li>
            {item.id}
            <div>
              <a>
                Title: {item.tit
              </a>
            </div>
            <div>
              Tags:
              {Object.entries(it
                .sort(customSort
                .map(([tagName, 
                  if (tagValue) 
                    return <span
                  }
                  return null;
                })}
            </div>
          </li>
        </ul>
      ))}
    </div>
  );
}
