import { TriangleUpIcon } from '@radix-ui/react-icons'

type Props = {}

export default function FeedbackList({}: Props) {
  return (
    <ol className="feedback-list">
      <li className="feedback">
        <button>
          <TriangleUpIcon />
          <span>593</span>
        </button>

        <div>
          <p>B</p>
        </div>

        <div>
          <p>VietNguyen</p>
          <p>
            Lorem ip dolor sit amet consectetur adipisicing elit. Porro nihil
            sdfdf sdfkdsf{' '}
          </p>
        </div>

        <p>4d</p>
      </li>
    </ol>
  )
}
