import CommentData from "../fixtures/comment";
import { Comment } from "../components";
import { FaStar } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function CommentContainer() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    initialSlide: 0,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
          pauseOnHover: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          pauseOnHover: true,
        },
      },
    ],
  };
  return (
    <Comment.Container>
      <Comment.MainTitle>
        Piano Transcription Is Loved By Users
      </Comment.MainTitle>
      <Comment.SubTitle>
      Even the most user-friendly products can get snubbed by people. Let’s take a look at the three major reasons why users love some products over others, and what you can do to make sure they keep coming back to you!
      </Comment.SubTitle>
      {/* <Comment.Box> */}
      <Slider {...settings}>
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
      </Slider>
      {/* </Comment.Box> */}
    </Comment.Container>
  );
}
