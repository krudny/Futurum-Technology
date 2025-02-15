"use client";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
} from "@mui/material";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useApplicationContext } from "@/app/utils/ApplicationContext";
import { useDialogContext } from "@/app/utils/DialogContext";
import EditCampaign from "@/app/components/EditCampaign";
import React from "react";
import { Campaign } from "@/app/interfaces/interfaces";

export default function CampaignList() {
  const { campaigns, deleteCampaign } = useApplicationContext();
  const { toggleEditDialog, editDialog } = useDialogContext();
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null,
  );

  const handleEdit = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    toggleEditDialog();
  };

  return (
    <>
      {campaigns.length > 0 ? (
        <>
          <TableContainer component={Paper} className="mt-10">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className="bg-neutral-100">
                  <TableCell>Name</TableCell>
                  <TableCell>Bid</TableCell>
                  <TableCell>Fund</TableCell>
                  <TableCell>Product</TableCell>
                  <TableCell>City</TableCell>
                  <TableCell>Keyword</TableCell>
                  <TableCell>Radius</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell colSpan={2} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {campaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell>{campaign.name}</TableCell>
                    <TableCell>{campaign.bid}</TableCell>
                    <TableCell>{campaign.fund}</TableCell>
                    <TableCell>{campaign.product.name}</TableCell>
                    <TableCell>{campaign.city.name}</TableCell>
                    <TableCell>{campaign.keyword}</TableCell>
                    <TableCell>{campaign.radius}</TableCell>
                    <TableCell>{campaign.status}</TableCell>
                    <TableCell sx={{ width: "40px" }}>
                      <IconButton onClick={() => handleEdit(campaign)}>
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell sx={{ width: "40px" }}>
                      <IconButton onClick={() => deleteCampaign(campaign.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {editDialog && selectedCampaign && (
            <EditCampaign campaign={selectedCampaign} />
          )}
        </>
      ) : (
        <h2 className="text-2xl mt-16 font-light">No campaigns added</h2>
      )}
    </>
  );
}
