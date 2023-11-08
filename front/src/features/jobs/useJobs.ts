import {
  jobAtom,
  jobConditionAtom,
  jobConditionDisplayAtom,
  loadingAtom,
  initialJobCondition,
  jobSearchKeywordAtom,
} from "@/atoms/atoms";
import { useSetAtom } from "jotai";
import { useRouter } from "next/router";
import { JobListResponse } from "./job.type";
import fetch from "@/libs/fetch";

const useJobs = () => {
  const router = useRouter();
  const setLoading = useSetAtom(loadingAtom);
  const setJobData = useSetAtom(jobAtom);
  const setCondition = useSetAtom(jobConditionAtom);
  const setConditionDisplay = useSetAtom(jobConditionDisplayAtom);
  const setSearchKeyword = useSetAtom(jobSearchKeywordAtom);

  /**
   * 特徴クリック時
   */
  const handleClickFeature = async (featuteId: number) => {
    try {
      setLoading(true);
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?features=${featuteId}`
      );
      setJobData(data);
      setCondition({ ...initialJobCondition, features: [featuteId] });
      setConditionDisplay({ ...initialJobCondition, features: [featuteId] });
      setSearchKeyword("");
      router.push(`/job/search?features=${featuteId}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0 });
    }
  };

  /**
   * 言語クリック時
   */
  const handleClickLanguage = async (languageId: number) => {
    try {
      setLoading(true);
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?languages=${languageId}`
      );
      setJobData(data);
      setCondition({ ...initialJobCondition, languages: [languageId] });
      setConditionDisplay({ ...initialJobCondition, languages: [languageId] });
      setSearchKeyword("");
      router.push(`/job/search?languages=${languageId}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0 });
    }
  };

  /**
   * スキルクリック時
   */
  const handleClickSkill = async (skillId: number) => {
    try {
      setLoading(true);
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?skills=${skillId}`
      );
      setJobData(data);
      setCondition({ ...initialJobCondition, skills: [skillId] });
      setConditionDisplay({ ...initialJobCondition, skills: [skillId] });
      setSearchKeyword("");
      router.push(`/job/search?skills=${skillId}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0 });
    }
  };

  /**
   * 職種クリック時
   */
  const handleClickEngineerType = async (engineerTypeId: number) => {
    try {
      setLoading(true);
      const { data } = await fetch.get<JobListResponse>(
        `/api/v1/jobs?engineerTypes=${engineerTypeId}`
      );
      setJobData(data);
      setCondition({ ...initialJobCondition, engineerTypes: [engineerTypeId] });
      setConditionDisplay({
        ...initialJobCondition,
        engineerTypes: [engineerTypeId],
      });
      setSearchKeyword("");
      router.push(`/job/search?engineerTypes=${engineerTypeId}`, undefined, {
        shallow: true,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      window.scrollTo({ top: 0 });
    }
  };

  return {
    handleClickFeature,
    handleClickLanguage,
    handleClickSkill,
    handleClickEngineerType,
  };
};
export default useJobs;
