import { Box, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

const Skeleton = ({ noOfLines = "4", spacing = "4", skeletonHeight = "2" }) => {
  return (
    <Box padding="6" boxShadow="lg" bg="white">
      <SkeletonCircle size="10" />
      <SkeletonText
        mt="4"
        noOfLines={noOfLines}
        spacing={spacing}
        skeletonHeight={skeletonHeight}
      />
    </Box>
  );
};

Skeleton.propTypes = {};

export default Skeleton;
