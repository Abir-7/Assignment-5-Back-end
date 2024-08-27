import { RequestHandler } from 'express';
import { FacilityService } from './facility.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';

const getAllFacility: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacilityService.getAllFacilityFromDB();

  return sendResponse(res, {
    success: result.length ? true : false,
    statusCode: result.length ? 200 : 404,
    message: result.length
      ? 'Facilities retrieved successfully'
      : 'No Data Found',
    data: result,
  });
});
const getSingleFacility: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacilityService.getSingleFacilityFromDB(req.params?.id);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facility is retrive successfully',
    data: result,
  });
});

const createFacility: RequestHandler = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await FacilityService.createFacilityIntoDB(data);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facility added successfully',
    data: result,
  });
});

const updateFacility: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  const result = await FacilityService.updateFacilityIntoDB(id, updatedData);

  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facility updated successfully',
    data: result,
  });
});

const deleteFacility: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  console.log(req.params, 'kk');
  const result = await FacilityService.deleteFacilityFromDB(id);
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Facility deleted successfully',
    data: result,
  });
});

export const FacilityController = {
  createFacility,
  updateFacility,
  deleteFacility,
  getAllFacility,
  getSingleFacility,
};
