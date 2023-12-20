import axios from "axios";
import { Heading, Image, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { server } from "../index";
import { Container, HStack, VStack } from "@chakra-ui/react";
import Loader from "./Loader";

function Exchanges() {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchExchanges = async () => {
      const { data } = await axios.get(`${server}/exchanges`);
      setExchanges(data);
      setLoading(false);
    };
    fetchExchanges();
  }, []);
  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={'wrap'}>
            {exchanges.map((i) => (
              <ExchangeCard
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
              />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
}

const ExchangeCard = ({ name, img, rank, url }) => (
  <a href={url} target={"blank"}>
    <VStack w={'52'} p={'8'} shadow={'lg'} borderRadius={'lg'} transition={'all 0.3s'} m={'4'} 
    css={{"&:hover":{
      transform:'scale(1.1)',
    },
    }}>
      <Image
        src = {img}
        h={"10"}w = {"10"}
        objectFit = {"contain"}
        alt = {"Exchange"}
      />
      <Heading size={'md'} noOfLines={1}>{rank}</Heading>
      <Text noOfLines={1} >{name}</Text>
    </VStack>
  </a>
);

export default Exchanges;
