import React, { useEffect, useMemo, useState } from "react";
import { ContentBox, CardsBox, NoFoundBox } from "./liveClassesComponents";
import useFetch from "src/features/hooks/useFetch";
import { H1, H2, H3, P1, P2, Section, Filters } from "src/components";
import { LiveClassCard } from "src/components/Cards/";
import { Box } from "src/components/Banners";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters } from "src/features/filterSlice";
import Loader from "src/components/Loader";

function VideoClasses() {
  const { postData, res, loading } = useFetch();
  const { filters, filterTags } = useSelector((state) => state.filter);

  const [sort, setSort] = useState("newest");

  const dispatch = useDispatch();

  useEffect(() => {
    if (filterTags.length > 0) {
      dispatch(clearFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    postData("video/filter", filters);
    // filterTags.length > 0
    //   ?
    //   : fetchData("video");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterTags]);

  useEffect(() => {}, [res, loading]);

  const sortedVideos = useMemo(() => {
    if (res?.videos && res.videos.length > 0) {
      const videos = res.videos.sort((a, b) => {
        const titleA = a.title.toUpperCase();
        const titleB = b.date.toUpperCase();

        if (sort === "newest") {
          if (titleA > titleB) return -1;
          if (titleA < titleB) return 1;
          return 0;
        }

        if (sort === "oldest") {
          if (titleB > titleA) return -1;
          if (titleB < titleA) return 1;
          return 0;
        }
        return 0;
      });
      return videos;
    }
    return [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort, res?.videos]);

  return (
    <React.Fragment>
      {/* Hero Section */}
      <Section paddingBlock="7.5vw">
        <ContentBox>
          <H1>Our Video Class</H1>
          <P1>
            Start Your Yoga, Meditation And Fitness Routines By Availing Our
            Live Or Recorded Videos
          </P1>
        </ContentBox>
      </Section>

      {/* Filter, Tags and Search Section */}
      <Section backgroundColor="#fff" paddingBlock="3vw">
        <Box gap="16px" direction="column">
          <H2>Our Videos</H2>
          <P2>
            Imagining professional yoga lessons without the hassle of travelling
            has now become easier. Start your Yoga, Meditation
          </P2>
        </Box>
        <Filters
          videoSort={sort}
          setVideoSort={setSort}
          videoCount={res?.videos ? res.videos.length : 0}
          videoType="VIDEOS"
        />
      </Section>

      {/* Cards Section */}
      <Section backgroundColor="white">
        {loading && <Loader width="35px" height="35px" />}

        {!loading && res?.videos.length > 0 ? (
          <CardsBox>
            {sortedVideos.map((val) => (
              <LiveClassCard key={`card-${val._id}`} data={val} />
            ))}
          </CardsBox>
        ) : (
          !loading && (
            <NoFoundBox>
              <H3>No Data Found</H3>
            </NoFoundBox>
          )
        )}
      </Section>
    </React.Fragment>
  );
}

export default VideoClasses;
