import { Grid, Paper, styled } from "@mui/material";
import AsideList from "@src/components/AsideList/AsideList";
import AsideListSkeleton from "@src/components/AsideList/AsideListSkeleton";
import Plateau from "@src/components/Plateau/Plateau";
import PlateauSkeleton from "@src/components/Plateau/PlateauSkeleton";
import { problemListDataToAsideListData } from "@src/services/utils.service";
import { IProblem } from "@src/types/problem.type";

const data: IProblem[] = [
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
    { 
      id: "sdmflkds",
      label: "Problem0001",
      level: "easy",
      problem: {"AB": ["eb", "fb", "bc", "cc", "dc", "be"], "AW": ["da", "ab", "bb", "cb", "db"], "SZ": "19", "C": "Black to play: Elementary", "SOL": [["B", "ba", "Correct.", ""]]}
    },
]
export default function Problems() {
  const isLoading = false

  return (
    <Grid container spacing={4} >
      <Grid item xs={12} sm={8} md={8} lg={8}>
        {
          (!isLoading && data)  
          ?
          <Plateau />
          :
          <PlateauSkeleton />
        }
      </Grid>
      <Grid item xs={12} sm={4} md={4} lg={4}>
        {
          (!isLoading && data)  
          ?
          <AsideList data={problemListDataToAsideListData(data)} />
          :
          <AsideListSkeleton />
        }
      </Grid>
    </Grid>
  )
}


const Item = styled(Paper)(({ theme }) => ({
  height: 50,
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

