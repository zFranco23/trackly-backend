import { IsString, IsUrl, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MaxLength(50)
  @MinLength(6)
  name: string;

  @IsString()
  @MaxLength(200)
  @MinLength(10)
  description: string;

  @IsString()
  @MaxLength(100)
  @IsUrl(undefined, {
    message: 'Repository URL must be a valid URL',
  })
  repository: string;
}
