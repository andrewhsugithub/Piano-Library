import CommentData from "../fixtures/comment";
import { Comment } from "../components";
import { FaStar } from "react-icons/fa";

export function CommentContainer() {
  return (
    <Comment.Container>
      <Comment.MainTitle>
        Piano Transcription Is Loved By Users
      </Comment.MainTitle>
      <Comment.SubTitle>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eum
        modi, adipisci facilis.
      </Comment.SubTitle>
      <Comment.Box>
        {CommentData.map((item) => (
          <Comment key={item.id}>
            <Comment.Pane>
              <Comment.Image src={item.profile} alt="face" />
              <Comment.Description>
                <Comment.Text>
                  <strong>{item.name},</strong> {item.job}
                </Comment.Text>
                <div>
                  {[...Array(5)].map((star, i) => {
                    if (i < item.rating) {
                      return <FaStar size={20} color="#ffb400" />;
                    } else return <FaStar size={20} />;
                  })}
                </div>
                {/* <Comment.Star>{item.rating}★</Comment.Star> */}
              </Comment.Description>
            </Comment.Pane>
            <Comment.Review>{item.comment}</Comment.Review>
          </Comment>
        ))}
      </Comment.Box>
    </Comment.Container>
  );
}
