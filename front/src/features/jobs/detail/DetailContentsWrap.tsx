import { useAtomValue } from "jotai";
import DetailContents from "./DetailContents";
import { jobDetailAtom } from "@/atoms/atoms";
import LoadPage from "@/components/LoadPage";
import Layout from "./Layout";

const DetailContentsWrap = () => {
  const jobDetail = useAtomValue(jobDetailAtom);
  return (
    <Layout jobName={jobDetail ? jobDetail.detail.title : ""}>
      {jobDetail ? <DetailContents {...jobDetail} /> : <LoadPage />};
    </Layout>
  );
};

export default DetailContentsWrap;
