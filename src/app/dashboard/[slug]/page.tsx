interface Props {
  params: {
    slug: string;
  };
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;

  return <p>{slug}</p>;
};

export default Page;
