import CommentData from "../fixtures/comment";
import { Comment } from "../components";
import { startTransition } from "react";

export function CommentContainer() {
  return (
    <div>
      <Comment.MainTitle>
        Piano Transcription Is Loved By Users
      </Comment.MainTitle>
      <Comment.SubTitle>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis eum
        modi, adipisci facilis.
      </Comment.SubTitle>
      <Comment.Container>
        {CommentData.map((item) => (
          <Comment key={item.id}>
            <Comment.Pane>
              <Comment.Image src={item.profile} alt="face" />
              <Comment.Description>
                <Comment.Text>
                  <strong>{item.name},</strong> {item.job}
                </Comment.Text>
                <Comment.Star>{item.star_count}★</Comment.Star>
              </Comment.Description>
            </Comment.Pane>

            <Comment.Text>{item.comment}</Comment.Text>
          </Comment>
        ))}
      </Comment.Container>
    </div>
  );
}
