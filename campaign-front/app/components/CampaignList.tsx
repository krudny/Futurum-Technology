"use client";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell, IconButton,
} from "@mui/material";
import { useApplicationContext } from "@/app/utils/ApplicationContext";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';


export default function CampaignList() {
  const { campaigns, deleteCampaign} = useApplicationContext();

  return (
      <>
      {campaigns.length > 0 ? (
          <TableContainer component={Paper} className="mt-10">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Bid</TableCell>
                  <TableCell>Fund</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>Radius</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>{campaign.name}</TableCell>
                      <TableCell>{campaign.bid}</TableCell>
                      <TableCell>{campaign.fund}</TableCell>
                      <TableCell>{campaign.product.name}</TableCell>
                      <TableCell>{campaign.radius}</TableCell>
                      <TableCell>{campaign.status}</TableCell>
                      <TableCell className="w-1">
                        <IconButton >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell className="w-1">
                        <IconButton onClick={() => deleteCampaign(campaign.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      ) : (
        <h2 className="text-2xl mt-16">No campaigns added</h2>
      )}
      </>
  );
}
