"use client";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
import { useApplicationContext } from "@/app/utils/ApplicationContext";

export default function CampaignList() {
  const { campaigns } = useApplicationContext();

  return (
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
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
