import { useState } from "react"
import "./App.css"

type TCardList = {
  id: number
  order: number
  text: string
}

function App() {
  const [cardList, setCardList] = useState<TCardList[] | null>([
    {
      id: 1,
      order: 1,
      text: "Card 1",
    },
    {
      id: 2,
      order: 2,
      text: "Card 2",
    },
    {
      id: 3,
      order: 3,
      text: "Card 3",
    },
    {
      id: 4,
      order: 4,
      text: "Card 4",
    },
  ])
  const [currentCard, setCurrentCard] = useState<TCardList | null>(null)

  function dragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    card: TCardList
  ) {
    setCurrentCard(card)
  }

  function dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    const target = e.target as HTMLDivElement
    target.style.background = "white"
  }

  function dragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const target = e.target as HTMLDivElement
    target.style.background = "red"
  }

  function dropHanlder(e: React.DragEvent<HTMLDivElement>, card: TCardList) {
    e.preventDefault()
    if (!cardList || !currentCard) return

    setCardList(
      cardList?.map((c) => {
        if (c.id === card.id) {
          return { ...c, order: currentCard.order }
        }
        if (c.id === currentCard.id) {
          return { ...c, order: card.order }
        }
        return c
      })
    )
  }

  const sortCards = (a: any, b: any) => {
    if (a.order < b.order) {
      return -1
    } else {
      return 1
    }
  }

  return (
    <div className="app">
      {cardList?.sort(sortCards).map((item) => (
        <div
          key={item.id}
          className="card"
          draggable
          onDragStart={(e) => {
            dragStartHandler(e, item)
          }}
          onDragEnd={(e) => {
            dragEndHandler(e)
          }}
          onDragOver={(e) => {
            dragOverHandler(e)
          }}
          onDrop={(e) => {
            dropHanlder(e, item)
          }}>
          {item.text}
        </div>
      ))}
    </div>
  )
}

export default App
