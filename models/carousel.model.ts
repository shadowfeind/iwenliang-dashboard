import mongoose, { Document } from "mongoose";

interface ICarousel extends Document {
  image: string;
}

const carouselSchema = new mongoose.Schema<ICarousel>({
  image: {
    type: String,
    required: true,
  },
});

const Carousel =
  mongoose.models.Carousel ||
  mongoose.model<ICarousel>("Carousel", carouselSchema);
export default Carousel;
