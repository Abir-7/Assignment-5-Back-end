import { RequestHandler } from 'express';
import { FacilityService } from './facility.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

const getAllFacility: RequestHandler = catchAsync(async (req, res) => {
  const query = req.query;

  const result = await FacilityService.getAllFacilityFromDB(query);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Facilities are retrieved succesfully',
    meta: result.meta,
    data: result.result,
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
const getTopFacility: RequestHandler = catchAsync(async (req, res) => {
  const result = await FacilityService.getTopFacilityFromDB();
  return sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'Top Facility is retrive successfully',
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
  getTopFacility,
};
